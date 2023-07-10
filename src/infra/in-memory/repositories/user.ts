import { User } from "../../../domain/types/user";
import { UserEntity } from "../../../domain/entities/user";

import { SaveUserAction } from "../../../data/user/save";

export class InMemoryUserRepository implements SaveUserAction {
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
}
