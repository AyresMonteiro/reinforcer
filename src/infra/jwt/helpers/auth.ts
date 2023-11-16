import * as jose from "jose";
import { TextEncoder } from "util";
import { GetCredentialsAction } from "../../../data/auth/get-credentials";
import { ValidateCredentialsAction } from "../../../data/auth/validate-credentials";
import { getEnvironmentVariable } from "../../environment/get-variable";
import { Authorization } from "../../../data/types/auth/authorization";
import { User } from "../../../domain/types/user";

export interface JoseJWTAuthHelperProps {
  privateKey: string;
  encryptionKey: string;
  issuer: string;
  audience: string;
  expirationTime: string;
}

export class JoseJWTAuthHelper
  implements GetCredentialsAction, ValidateCredentialsAction
{
  constructor(
    private readonly props: JoseJWTAuthHelperProps = {
      privateKey: getEnvironmentVariable("JWT_PRIVATE_KEY"),
      encryptionKey: getEnvironmentVariable("JWT_ENCRYPTION_KEY"),
      issuer: getEnvironmentVariable("JWT_ISSUER"),
      audience: getEnvironmentVariable("JWT_AUDIENCE"),
      expirationTime: "1h",
    }
  ) {}

  private get privateKey() {
    return new TextEncoder().encode(this.props.privateKey);
  }

  private get encryptionKey() {
    return new TextEncoder().encode(this.props.encryptionKey);
  }

  async sign(data: any) {
    const signer = new jose.SignJWT(data)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer(this.props.issuer)
      .setAudience(this.props.audience)
      .setExpirationTime(this.props.expirationTime);

    return await signer.sign(this.privateKey);
  }

  async encrypt(data: any) {
    const encrypter = new jose.EncryptJWT(data)
      .setProtectedHeader({ alg: "A256KW", enc: "A256GCM" })
      .setIssuedAt()
      .setIssuer(this.props.issuer)
      .setAudience(this.props.audience)
      .setExpirationTime(this.props.expirationTime);

    return await encrypter.encrypt(this.encryptionKey);
  }

  async verify(jwt: string) {
    try {
      const { payload } = await jose.jwtVerify(jwt, this.privateKey, {
        audience: this.props.audience,
        issuer: this.props.issuer,
      });

      return payload;
    } catch (error) {
      return false;
    }
  }

  async decrypt(jwt: string) {
    try {
      const { payload } = await jose.jwtDecrypt(jwt, this.encryptionKey, {
        audience: this.props.audience,
        issuer: this.props.issuer,
      });

      return payload;
    } catch (error) {
      return false;
    }
  }

  async getCredentials(data: User): Promise<Authorization> {
    const { id, name, email } = data;

    const token = await this.encrypt({
      id,
      user: { id, name, email },
    });

    return {
      user: data,
      session: token,
    };
  }

  async validate(session: string): Promise<Authorization | null> {
    const payload = await this.decrypt(session);

    if (!payload) {
      return null;
    }

    const { id, user } = payload;

    return {
      user: user as User,
      session: await this.encrypt({ id, user }),
    };
  }
}
