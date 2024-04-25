import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { RealIp } from 'nestjs-real-ip';
import { EntityManager } from 'typeorm';

import { Post as PostEntity } from '../db/entity/Post';
import { PostComment } from '../db/entity/PostComment';
import { GetCommentsBody, GetFeedsBody, PostCommentBody } from './post.params';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly mgr: EntityManager,
  ) {}

  @Get()
  async getFeeds(@Body() body: GetFeedsBody): Promise<PostEntity[]> {
    const query = this.postService.createPostQueryBuilder(4).take(10);

    if (body.afterId) {
      const writtenAt = await this.postService.getRawWrittenAt(body.afterId);

      if (writtenAt)
        query.where('post.writtenAt < :writtenAt', {
          writtenAt,
        });
    }

    const posts = await query.getMany();

    await Promise.all(
      posts.map(async (post) => {
        await this.postService.updatePostVoteCount(post);
        delete post.voteCountUpdatedAt;
      }),
    );

    return posts;
  }

  @Get(':postId')
  async getFeed(@Param('postId') postId: number): Promise<PostEntity> {
    const post = await this.postService
      .createPostQueryBuilder(10)
      .where('post.id = :postId', { postId })
      .getOne();

    if (!post) throw new NotFoundException();

    await this.postService.updatePostVoteCount(post);
    delete post.voteCountUpdatedAt;

    return post;
  }

  @Get(':postId/comments')
  async getComments(
    @Param('postId') postId: number,
    @Body() body: GetCommentsBody,
  ): Promise<PostComment[]> {
    const query = this.postService
      .createPostCommentQueryBuilder(postId)
      .take(10);

    if (body.beforeIndex)
      query.andWhere('comment.index < :beforeIndex', {
        beforeIndex: body.beforeIndex,
      });

    if (body.afterIndex)
      query.andWhere(':afterIndex < comment.index', {
        afterIndex: body.afterIndex,
      });

    return await query.getMany();
  }

  @Post(':postId/comments')
  async postComment(
    @Param('postId') postId: number,
    @Body() body: PostCommentBody,
    @RealIp() ip: string,
  ): Promise<void> {
    return this.mgr.transaction(async (mgr) => {
      const result = await this.postService.queryPostAndCommentCountWithLock(
        postId,
        mgr,
      );

      if (!result) throw new NotFoundException();

      const comment = new PostComment();
      comment.postId = postId;
      comment.index = result.comments + 1;
      comment.ip = ip;
      comment.content = body.content;
      await mgr.save(comment, { reload: false });
    });
  }
}
