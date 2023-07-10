import { User } from "../../domain/types/user";

import { UserEntity } from "../../domain/entities/user";

export interface SaveUserAction {
  save(data: Pick<User, "email" | "name" | "password">): Promise<UserEntity>;
}
