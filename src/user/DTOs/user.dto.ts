import { UserDocument } from '../schemas/user.schema';

export class UserDto {
  constructor(user: UserDocument) {
    this._id = user._id.toString();
    this.email = user.email;
  }

  _id: string;
  email: string;
}
