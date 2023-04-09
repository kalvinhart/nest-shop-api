import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from './DTOs/create-user.dto';
import { SignInDto } from './DTOs/sign-in.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { UserDto } from 'src/user/DTOs/user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInResultDto } from './DTOs/sign-in-result.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const { email, password } = user;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) throw new Error();

    const passwordHash = hashSync(password, 12);

    const newUser = new User();
    newUser.email = email;
    newUser.password = passwordHash;

    return await this.userRepository.save<User>(newUser);
  }

  async signIn(userCredentials: SignInDto): Promise<SignInResultDto> {
    const { email, password } = userCredentials;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('Invalid username/password.');

    const match = compareSync(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid username/password.');

    const payload = {
      userId: user.id,
    };

    const userResult = new UserDto();
    userResult.email = user.email;
    userResult.id = user.id;

    return {
      token: await this.jwtService.signAsync(payload),
      user: userResult,
    };
  }
}
