import { SaveUserAction } from "../../data/user/save";

import { Usecase } from "../contracts/usecase";
import { HashStringAction } from "../../data/string/hash";
import { CreateUserData } from "../@types/create-user";
import { User } from "../../domain/types/user";

export class CreateUser implements Usecase<CreateUserData, User> {
  constructor(
    public readonly saveUser: SaveUserAction,
    public readonly hashString: HashStringAction
  ) {}

  async execute(data: CreateUserData): Promise<User> {
    data.password = await this.hashString.hash(data.password);

    const newUser = await this.saveUser.save(data);

    return newUser.plain();
  }
}
