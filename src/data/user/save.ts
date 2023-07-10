import { User } from "../../domain/types/user";

import { UserEntity } from "../../domain/entities/user";

export interface SaveUserAction {
  execute(data: User): Promise<UserEntity>;
}
