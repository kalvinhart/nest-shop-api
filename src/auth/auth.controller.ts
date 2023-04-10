import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './DTOs/sign-in.dto';
import { CreateUserDto } from './DTOs/create-user.dto';
import { UserDto } from 'src/user/DTOs/user.dto';
import { AuthService } from './auth.service';
import { SignInResultDto } from './DTOs/sign-in-result.dto';
import { UserDocument } from 'src/user/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResultDto> {
    const { user, token } = await this.authService.signIn(signInDto);
    return new SignInResultDto(user, token);
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user: UserDocument = await this.authService.createUser(createUserDto);
    return new UserDto(user);
  }
}
