import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateUserDto } from './DTOs/create-user.dto';
import { SignInDto } from './DTOs/sign-in.dto';
import { compareSync, hashSync } from 'bcrypt';
import { UserDto } from 'src/user/DTOs/user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInResultDto } from './DTOs/sign-in-result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserDocument> {
    const { email, password } = user;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new Error();

    const passwordHash = hashSync(password, 12);

    const newUser = new this.userModel();
    newUser.email = email;
    newUser.password = passwordHash;

    return await newUser.save();
  }

  async signIn(userCredentials: SignInDto): Promise<SignInResultDto> {
    const { email, password } = userCredentials;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid username/password.');

    const match = compareSync(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid username/password.');

    const payload = {
      userId: user.id,
    };

    const userResult = new UserDto(user);

    return {
      token: await this.jwtService.signAsync(payload),
      user: userResult,
    };
  }
}
