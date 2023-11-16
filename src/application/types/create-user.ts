import { User } from "../../domain/types/user";

export type CreateUserData = Required<
  Pick<User, "name" | "email" | "password">
>;
