import { UserEntity } from "../../domain/entities/user";

export interface GetUserByEmailAction {
  getByEmail(email: string): Promise<UserEntity | null>;
}
