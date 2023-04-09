import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './DTOs/sign-in.dto';
import { CreateUserDto } from './DTOs/create-user.dto';
import { UserDto } from 'src/user/DTOs/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto): UserDto {
    const user = this.authService.signIn(signInDto);
    return new UserDto();
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto): UserDto {
    const user = this.authService.createUser(createUserDto);
    return new UserDto();
  }
}
