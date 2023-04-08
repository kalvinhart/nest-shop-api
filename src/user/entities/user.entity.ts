import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserAddress } from './user-address.entity';
import { UserWishlist } from './user-wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => UserAddress, (address) => address.user)
  address: UserAddress[];

  @OneToOne(() => UserWishlist, (wishlist) => wishlist.user)
  @JoinColumn()
  wishlist: UserWishlist;
}
