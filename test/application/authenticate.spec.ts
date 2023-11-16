// Authenticate Usecase
// You should send the following data to the app:
// - session
// The app should return an authorization with session string and user data.
// If the session is not valid, throw an error.

import { faker } from "@faker-js/faker";

import { Login } from "../../src/application/usecases/login";
import { CreateUser } from "../../src/application/usecases/create-user";
import { Authenticate } from "../../src/application/usecases/authenticate";

import { InMemoryUserRepository } from "../mock/infra/in-memory/repositories/user";
import { MockHashStringHelper } from "../mock/infra/helper/string/hash";
import { MockAuthHelper } from "../mock/infra/helper/auth/credentials";

function makeSut() {
  const compareHashStringAction = new MockHashStringHelper();
  const getUserByEmailAction = new InMemoryUserRepository();
  const getCredentialsAction = new MockAuthHelper();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    usecase: new Authenticate(getCredentialsAction),
    payload: {
      session: faker.string.uuid(),
    },
    dependencies: {
      compareHashStringAction,
      getUserByEmailAction,
      getCredentialsAction,
    },
    otherSystems: {
      login: {
        system: new Login(
          getUserByEmailAction,
          compareHashStringAction,
          getCredentialsAction
        ),
      },
      createUser: {
        system: new CreateUser(getUserByEmailAction, compareHashStringAction),
        payload: {
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({
            firstName,
            lastName,
          }),
          password: faker.internet.password(),
        },
      },
    },
  };
}

describe("@application/usecases/authenticate", () => {
  it("should return an authorization with session string and user data", async () => {
    const { usecase, payload, otherSystems } = makeSut();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;

    const email = faker.internet.email({
      firstName,
      lastName,
      provider: "example.com",
    });
    const password = faker.internet.password();

    await otherSystems.createUser.system.execute({
      name: fullName,
      email,
      password,
    });

    const authorization = await otherSystems.login.system.execute({
      email,
      password,
    });

    const response = await usecase.execute({
      session: authorization.session,
    });

    expect(response).toHaveProperty("session");
    expect(response).toHaveProperty("user");
  });

  it("should throw an error if the session is not valid", async () => {
    const { usecase } = makeSut();

    await expect(
      usecase.execute({
        session: faker.string.uuid(),
      })
    ).rejects.toThrowError("Invalid session");
  });
});
