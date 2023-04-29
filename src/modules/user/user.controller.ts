import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './DTOs/user.dto';
import { UserService } from './user.service';
import { AddToWishlistDto } from './DTOs/add-to-wishlist.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.getUserById(id);
    return new UserDto(user);
  }

  @Post('wishlist/add')
  async addProductToWishlist(addToWishlistDto: AddToWishlistDto): Promise<void> {
    await this.userService.addProductToWishlist(addToWishlistDto);
  }
}
