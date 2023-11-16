import { User } from "../../domain/types/user";

export type LoginData = Required<Pick<User, "email" | "password">>;
