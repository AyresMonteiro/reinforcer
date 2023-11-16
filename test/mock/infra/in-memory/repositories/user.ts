import { SaveUserAction } from "../../../../../src/data/user/save";
import { User } from "../../../../../src/domain/types/user";
import { UserEntity } from "../../../../../src/domain/entities/user";
import { GetUserByEmailAction } from "../../../../data/user/get-by-email";

export class InMemoryUserRepository
  implements SaveUserAction, GetUserByEmailAction
{
  private users: UserEntity[] = [];

  async save(
    data: Pick<User, "email" | "name" | "password">
  ): Promise<UserEntity> {
    const newUser = new UserEntity({
      id: `${this.users.length + 1}`,
      ...data,
    });

    this.users.push(newUser);

    return newUser;
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }
}
