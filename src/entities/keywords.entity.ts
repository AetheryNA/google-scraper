import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { Users } from './user.entity';

@Entity('keywords')
export class Keywords {
  @PrimaryGeneratedColumn()
  @Index('IDX_KEYWORD_ID')
  id: number;

  @Column()
  @Index('IDX_KEYWORD')
  keyword: string;

  @ManyToOne(() => Users, (user) => user.keyword)
  user: Users;

  @Column()
  total_ads: number;

  @Column()
  total_links: number;

  @Column()
  total_search_results: string;

  @Column()
  html_of_page: string;

  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;
}
