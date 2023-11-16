import { Usecase } from "../contracts/usecase";
import { LoginData } from "../types/login";
import { CompareHashStringAction } from "../../data/string/compare-hash";
import { GetUserByEmailAction } from "../../data/user/get-by-email";
import { GetCredentialsAction } from "../../data/auth/get-credentials";
import { Authorization } from "../../data/types/auth/authorization";

export class Login implements Usecase<LoginData, Authorization> {
  constructor(
    public readonly getUserByEmail: GetUserByEmailAction,
    public readonly compareHashString: CompareHashStringAction,
    public readonly getCredentials: GetCredentialsAction
  ) {}

  async execute(data: LoginData): Promise<Authorization> {
    const user = await this.getUserByEmail.getByEmail(data.email);

    if (!user) throw new Error("User not found");

    const canLogin = await this.compareHashString.compare(
      data.password,
      user.password
    );

    if (!canLogin) throw new Error("Invalid password");

    const authorization = await this.getCredentials.getCredentials(user);

    return authorization;
  }
}
