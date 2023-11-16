import { Usecase } from "../contracts/usecase";
import { Authorization } from "../../data/types/auth/authorization";
import { ValidateCredentialsAction } from "../../data/auth/validate-credentials";
import { AuthenticateData } from "../types/authenticate";

export class Authenticate implements Usecase<AuthenticateData, Authorization> {
  constructor(
    private readonly validateCredentials: ValidateCredentialsAction
  ) {}

  async execute(data: AuthenticateData): Promise<Authorization> {
    const authorization = await this.validateCredentials.validate(data.session);

    if (!authorization) {
      throw new Error("Invalid session");
    }

    return authorization;
  }
}
