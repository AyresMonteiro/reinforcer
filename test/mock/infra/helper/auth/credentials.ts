import { GetCredentialsAction } from "../../../../data/auth/get-credentials";
import { ValidateCredentialsAction } from "../../../../data/auth/validate-credentials";
import { Authorization } from "../../../../data/types/auth/authorization";
import { User } from "../../../../domain/types/user";

export class MockAuthHelper
  implements GetCredentialsAction, ValidateCredentialsAction
{
  private sessions: Record<string, Authorization>;

  constructor() {
    this.sessions = {};
  }

  async getCredentials(data: User): Promise<Authorization> {
    const session = Math.random().toString(36);

    this.sessions[session] = {
      user: data,
      session,
    };

    return this.sessions[session];
  }

  async validate(session: string): Promise<Authorization | null> {
    const authorization = this.sessions[session];

    if (!authorization) {
      return null;
    }

    return authorization;
  }
}
