import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';

import { Post } from '../db/entity/Post';
import { PostComment } from '../db/entity/PostComment';
import { PostDownvote } from '../db/entity/PostDownvote';
import { PostUpvote } from '../db/entity/PostUpvote';

const POST_VOTE_UPDATE_INTERVAL = 1000 * 60 * 5; // 5 min

@Injectable()
export class PostService {
  constructor(private readonly mgr: EntityManager) {}

  createPostQueryBuilder(maxCommentCount?: number): SelectQueryBuilder<Post> {
    return this.mgr
      .createQueryBuilder(Post, 'post')
      .leftJoin(
        'post.comments',
        'comment',
        maxCommentCount &&
          'comment.postId = post.id AND comment.index < :maxCommentCount',
        {
          maxCommentCount,
        },
      )
      .select([
        'post.id',
        'post.content',
        'post.codeURL',
        'post.imageURL',
        'post.upvotes',
        'post.downvotes',
        'post.writtenAt',
        'post.voteCountUpdatedAt',
        'comment.index',
        'comment.content',
        'comment.writtenAt',
      ])
      .orderBy('post.writtenAt', 'DESC')
      .orderBy('comment.index', 'DESC');
  }

  createPostCommentQueryBuilder(
    postId: string | number,
  ): SelectQueryBuilder<PostComment> {
    return this.mgr
      .createQueryBuilder(PostComment, 'comment')
      .where('comment.postId = :postId', { postId })
      .select(['comment.index', 'comment.content', 'comment.writtenAt'])
      .orderBy('comment.index', 'DESC');
  }

  async queryPostAndCommentCountWithLock(
    postId: string | number,
    mgr?: EntityManager,
  ): Promise<{ postId: number; comments: number } | null> {
    mgr = mgr ?? this.mgr;

    const post = await mgr
      .createQueryBuilder(Post, 'post')
      .leftJoin('post.comments', 'comment')
      .where('post.id = :postId', { postId })
      .select('post.id', 'postId')
      .addSelect('COUNT(comment.index)', 'comments')
      .setLock('pessimistic_write')
      .getRawOne<{
        postId: string;
        comments: string;
      }>();

    return post
      ? {
          postId: Number(post.postId),
          comments: Number(post.comments),
        }
      : null;
  }

  async getRawWrittenAt(postId: string | number): Promise<string | null> {
    const pivot = await this.mgr
      .createQueryBuilder(Post, 'post')
      .where('post.id = :postId', { postId })
      .select('post.writtenAt', 'writtenAt')
      .getRawOne<{ writtenAt: string }>();

    return pivot?.writtenAt ?? null;
  }

  async updatePostVoteCount(post: Post): Promise<void> {
    if (
      Date.now() <=
      post.voteCountUpdatedAt.getTime() + POST_VOTE_UPDATE_INTERVAL
    )
      return;

    const [upvotes, downvotes] = await Promise.all([
      this.mgr
        .createQueryBuilder(PostUpvote, 'upvote')
        .where('upvote.postId = :postId', { postId: post.id })
        .getCount(),
      this.mgr
        .createQueryBuilder(PostDownvote, 'downvote')
        .where('downvote.postId = :postId', { postId: post.id })
        .getCount(),
    ]);

    await this.mgr
      .createQueryBuilder(Post, 'post')
      .update()
      .set({
        upvotes,
        downvotes,
        voteCountUpdatedAt: () => `CURRENT_TIMESTAMP(6)`,
      })
      .setParameter('postId', post.id)
      .execute();

    post.upvotes = upvotes;
    post.downvotes = downvotes;
  }
}
