import { UserDto } from 'src/user/DTOs/user.dto';

export class SignInResultDto {
  token: string;
  user: UserDto;
}
