import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Post } from './Post';

@Entity()
export class PostComment {
  @ManyToOne(() => Post, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post;

  @PrimaryColumn()
  postId: number;

  @PrimaryColumn()
  index: number;

  @Column({
    length: 64,
  })
  ip: string;

  @Column({
    length: 255,
  })
  content: string;

  @CreateDateColumn()
  writtenAt: Date;
}
