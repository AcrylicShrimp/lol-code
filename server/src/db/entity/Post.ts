import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostComment } from './PostComment';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  content: string;

  @Column('text', {
    nullable: true,
  })
  codeURL?: string;

  @Column('text', {
    nullable: true,
  })
  imageURL?: string;

  @Column({
    default: 0,
  })
  upvotes: number;

  @Column({
    default: 0,
  })
  downvotes: number;

  @OneToMany(() => PostComment, (comment) => comment.post, {
    nullable: false,
  })
  comments: PostComment[];

  @Index()
  @CreateDateColumn()
  writtenAt: Date;

  @Index()
  @CreateDateColumn()
  voteCountUpdatedAt: Date;
}
