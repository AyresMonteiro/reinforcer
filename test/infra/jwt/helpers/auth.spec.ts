import { Authorization } from "../../../../src/data/types/auth/authorization";
import { JoseJWTAuthHelper } from "../../../../src/infra/jwt/helpers/auth";

const makeSut = () => {
  // each char has 2 bytes in JavaScript, so use 16 chars to get 32 bytes
  const key = "24ea5743b415170d0560a2c3e7e58c17";

  return {
    sut: new JoseJWTAuthHelper({
      audience: "any_audience",
      issuer: "any_issuer",
      expiresIn: "1h",
      privateKey: key,
      encryptionKey: key,
    }),
    payload: {
      id: "any_id",
      name: "any_name",
      email: "any_email",
    },
  };
};

describe("@infra/jwt/helpers/auth", () => {
  test("it should generate credentials for user", async () => {
    const { sut, payload } = makeSut();

    const credentials = await sut.getCredentials(payload);

    expect(credentials).toHaveProperty("user");
    expect(credentials).toHaveProperty("session");
    expect(credentials.user).toEqual(payload);
  });

  test("it should validate credentials", async () => {
    const { sut, payload } = makeSut();

    const { session } = await sut.getCredentials(payload);

    const credentials = await sut.validate(session);

    expect(credentials).toHaveProperty("user");
    expect(credentials).toHaveProperty("session");
    expect((credentials as Authorization)?.user).toEqual(payload);
  });

  test("it should return null if credentials are invalid", async () => {
    const { sut } = makeSut();

    const credentials = await sut.validate("invalid_session");

    expect(credentials).toBeNull();
  });
});
