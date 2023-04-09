import { Controller, Get, Param } from '@nestjs/common';
import { UserDto } from './DTOs/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): UserDto {
    const user = this.userService.getUserById(id);
    return new UserDto();
  }
}
