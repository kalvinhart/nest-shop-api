import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { AddToWishlistDto } from "./DTOs/add-to-wishlist.dto";
import { Product } from "../product/schemas/product.schema";
import { RemoveFromWishlistDto } from "./DTOs/remove-from-wishlist.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async getUserById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id);
  }

  async addProductToWishlist(addToWishlistDto: AddToWishlistDto): Promise<void> {
    const { productId, userId } = addToWishlistDto;

    const product = await this.productModel.findById(productId);
    if (!product) throw new BadRequestException("Product not found.");

    const user = this.userModel.findById(userId);
    if (!user) throw new BadRequestException("User not found.");

    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          wishlist: productId
        }
      },
      { runValidators: true }
    );
  }

  async removeProductFromWishlist(removeFromWishlistDto: RemoveFromWishlistDto): Promise<void> {
    const { productId, userId } = removeFromWishlistDto;

    const product = await this.productModel.findById(productId);
    if (!product) throw new BadRequestException("Product not found.");

    const user = this.userModel.findById(userId);
    if (!user) throw new BadRequestException("User not found.");

    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          wishlist: productId
        }
      },
      { runValidators: true }
    );
  }
}
