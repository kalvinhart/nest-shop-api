import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class UserWishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.wishlist)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
