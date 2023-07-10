import { User } from "../../../domain/types/user";
import { UserEntity } from "../../../domain/entities/user";

import { SaveUserAction } from "../../../data/user/save";

export class InMemorySaveUserAction implements SaveUserAction {
  private users: UserEntity[] = [];

  async execute(data: User): Promise<UserEntity> {
    const newUser = new UserEntity(data);

    this.users.push(newUser);

    return newUser;
  }
}
