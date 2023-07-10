import { User } from "../../domain/types/user";
import { UserEntity } from "../../domain/entities/user";

import { SaveUserAction } from "../../data/user/save";

import { Usecase } from "../contracts/usecase";

export class CreateUser implements Usecase<User, UserEntity> {
  constructor(private readonly saveUser: SaveUserAction) {}

  async execute(
    data: Pick<User, "name" | "email" | "password">
  ): Promise<UserEntity> {
    const newUser = await this.saveUser.save(data);

    return newUser;
  }
}
