// Login Usecase
// You should send the following data to the app:
// - email
// - password
// The app should return an authorization with session string and user data.
// If the user does not exist, the app should throw an error.
// If the password is invalid, the app should throw an error.

import { faker } from "@faker-js/faker";

import { Login } from "../../../src/application/usecases/login";
import { CreateUser } from "../../../src/application/usecases/create-user";

import { InMemoryUserRepository } from "../../mock/infra/in-memory/repositories/user";
import { MockHashStringHelper } from "../../mock/infra/helper/string/hash";
import { MockAuthHelper } from "../../mock/infra/helper/auth/credentials";

function makeSut() {
  const compareHashStringAction = new MockHashStringHelper();
  const getUserByEmailAction = new InMemoryUserRepository();
  const getCredentialsAction = new MockAuthHelper();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    usecase: new Login(
      getUserByEmailAction,
      compareHashStringAction,
      getCredentialsAction
    ),
    payload: {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName,
        lastName,
      }),
      password: faker.internet.password(),
    },
    dependencies: {
      compareHashStringAction,
      getUserByEmailAction,
      getCredentialsAction,
    },
    otherSystems: {
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

describe("@application/usecases/login", () => {
  test("it should login user", async () => {
    const { usecase, payload, otherSystems } = makeSut();

    const email = faker.internet.email();
    const password = otherSystems.createUser.payload.password;

    await otherSystems.createUser.system.execute({
      ...otherSystems.createUser.payload,
      email,
      password,
    });

    payload.email = email;
    payload.password = password;

    const testClosure = async () => {
      const authorization = await usecase.execute(payload);

      expect(authorization).not.toStrictEqual(undefined);
    };

    await expect(testClosure()).resolves.not.toThrow();
  });

  test("it should throw an error when user does not exist", async () => {
    const { usecase, payload } = makeSut();

    await expect(async () => {
      await usecase.execute(payload);
    }).rejects.toThrow("User not found");
  });

  test("it should throw an error when password is invalid", async () => {
    const { usecase, payload, otherSystems } = makeSut();

    const newUser = await otherSystems.createUser.system.execute(
      otherSystems.createUser.payload
    );

    payload.email = newUser.email;
    payload.password = faker.internet.password();

    await expect(async () => {
      await usecase.execute(payload);
    }).rejects.toThrow("Invalid password");
  });
});
