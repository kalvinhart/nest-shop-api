import { Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UserDto } from './DTOs/user.dto';
import { UserService } from './user.service';
import { AddToWishlistDto } from './DTOs/add-to-wishlist.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    try {
      const user = await this.userService.getUserById(id);
      return new UserDto(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('wishlist/add')
  async addProductToWishlist(addToWishlistDto: AddToWishlistDto): Promise<void> {
    try {
      await this.userService.addProductToWishlist(addToWishlistDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
