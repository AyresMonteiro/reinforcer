import { GetUserByEmailAction } from "../../../../data/user/get-by-email";
import { SaveUserAction } from "../../../../data/user/save";
import { UserEntity } from "../../../../domain/entities/user";
import { User } from "../../../../domain/types/user";

import { MongooseUserModel } from "../schemas/user";

export class MongooseDbUserRepository
  implements GetUserByEmailAction, SaveUserAction
{
  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await MongooseUserModel.findOne({ email: email }).exec();

    if (!user) {
      return null;
    }

    const userData = user.toObject();

    return new UserEntity({
      email: userData.email,
      id: String(userData._id),
      name: userData.name,
      password: userData.password,
    });
  }

  async save(
    data: Required<Pick<User, "name" | "email" | "password">>
  ): Promise<UserEntity> {
    const user = new MongooseUserModel(data);

    await user.save();

    return new UserEntity(user.toObject());
  }
}
