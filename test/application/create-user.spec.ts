// Create User Usecase
// You should send the following data to the app:
// - name
// - email
// - password
// The app should return a recently-created User entity back.

import { faker } from "@faker-js/faker";

import { CreateUser } from "../../src/application/usecases/create-user";

import { InMemorySaveUserAction } from "../../src/infra/in-memory/actions/save-user";

function makeSut() {
  const saveUserAction = new InMemorySaveUserAction();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    usecase: new CreateUser(saveUserAction),
    payload: {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName,
        lastName,
      }),
    },
  };
}

test("it should create user", async () => {
  const { usecase, payload } = makeSut();

  const newUser = await usecase.execute(payload);

  expect(newUser).not.toStrictEqual(undefined);
  expect(typeof newUser).toStrictEqual("object");
  expect(newUser.name).toStrictEqual(payload.name);
  expect(newUser.email).toStrictEqual(payload.email);
  expect(newUser.password).toStrictEqual(undefined);
});
