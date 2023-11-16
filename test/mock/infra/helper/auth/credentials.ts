import { GetCredentialsAction } from "../../../../data/auth/get-credentials";
import { Authorization } from "../../../../data/types/auth/authorization";
import { User } from "../../../../domain/types/user";

export class MockAuthHelper implements GetCredentialsAction {
  async getCredentials(data: User): Promise<Authorization> {
    return {
      user: data,
      session: "any_session",
    };
  }
}
