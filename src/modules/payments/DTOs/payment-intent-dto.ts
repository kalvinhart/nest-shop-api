import { UserDto } from 'src/modules/user/DTOs/user.dto';

export class PaymentIntentDto {
  user: UserDto;
  items: any;
}
