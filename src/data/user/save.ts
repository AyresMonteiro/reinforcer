import { User } from "../../domain/types/user";

import { UserEntity } from "../../domain/entities/user";

export interface SaveUserAction {
  save(data: User): Promise<UserEntity>;
}
