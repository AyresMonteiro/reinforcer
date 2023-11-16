import { User } from "../../domain/types/user";

import { Authorization } from "../types/auth/authorization";

export interface GetCredentialsAction {
  getCredentials(data: User): Promise<Authorization>;
}
