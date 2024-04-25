import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Post } from './Post';

@Entity()
export class PostUpvote {
  @ManyToOne(() => Post, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post;

  @PrimaryColumn()
  postId: number;

  @PrimaryColumn({
    length: 64,
  })
  ip: string;

  @CreateDateColumn()
  writtenAt: Date;
}
