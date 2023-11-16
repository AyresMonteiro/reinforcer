// Create User Usecase
// You should send the following data to the app:
// - name
// - email
// - password
// The app should return a recently-created User entity back.

import { faker } from "@faker-js/faker";

import { CreateUser } from "../../src/application/usecases/create-user";

import { InMemoryUserRepository } from "../mock/infra/in-memory/repositories/user";
import { MockHashStringHelper } from "../mock/infra/helper/string/hash";

function makeSut() {
  const hashStringAction = new MockHashStringHelper();
  const saveUserAction = new InMemoryUserRepository();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    usecase: new CreateUser(saveUserAction, hashStringAction),
    payload: {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName,
        lastName,
      }),
      password: faker.internet.password(),
    },
    dependencies: {
      saveUserAction,
      hashStringAction,
    },
  };
}

describe("@application/usecases/create-user", () => {
  test("it should create user", async () => {
    const { usecase, payload } = makeSut();

    const newUser = await usecase.execute(payload);

    expect(newUser).not.toStrictEqual(undefined);
    expect(typeof newUser).toStrictEqual("object");
    expect(newUser.name).toStrictEqual(payload.name);
    expect(newUser.email).toStrictEqual(payload.email);
    expect(newUser.password).toStrictEqual(undefined);
  });

  test("it should create user with id", async () => {
    const { usecase, payload } = makeSut();

    const newUser = await usecase.execute(payload);

    expect(newUser).not.toStrictEqual(undefined);
    expect(typeof newUser).toStrictEqual("object");
    expect(newUser.id).not.toStrictEqual(undefined);
    expect(newUser.id).not.toStrictEqual("");
    expect(typeof newUser.id).toStrictEqual("string");
    expect(newUser.name).toStrictEqual(payload.name);
    expect(newUser.email).toStrictEqual(payload.email);
    expect(newUser.password).toStrictEqual(undefined);
  });

  test("it should call hash on password one time", async () => {
    const { usecase, payload, dependencies } = makeSut();

    const hashSpy = jest.spyOn(dependencies.hashStringAction, "hash");

    await usecase.execute(payload);

    expect(hashSpy).toHaveBeenCalledTimes(1);
  });
});
