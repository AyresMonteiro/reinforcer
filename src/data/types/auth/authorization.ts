import { User } from "../../../domain/types/user";

export interface Authorization {
  user: User;
  session: string;
}
