// Create User Usecase
// You should send the following data to the app:
// - name
// - email
// - password
// The app should return a recently-created User entity back.

import { faker } from "@faker-js/faker";

interface User {
  name: string;
  email: string;
  password?: string;
}

class UserEntity implements User {
  constructor(private readonly data: User) {}

  get name(): string {
    return this.data["name"];
  }

  get email(): string {
    return this.data["email"];
  }

  get password(): string | undefined {
    return this.data["password"];
  }

  plain() {
    return {
      name: this.name,
      email: this.email,
    };
  }
}

interface Usecase<Input, Output> {
  execute(data: Input): Promise<Output>;
}

interface SaveUserAction {
  execute(data: User): Promise<UserEntity>;
}

class CreateUser implements Usecase<User, UserEntity> {
  constructor(private readonly saveUser: SaveUserAction) {}

  async execute(data: User): Promise<UserEntity> {
    const newUser = await this.saveUser.execute(data);

    return newUser;
  }
}

class InMemorySaveUserAction implements SaveUserAction {
  private users: UserEntity[] = [];

  async execute(data: User): Promise<UserEntity> {
    const newUser = new UserEntity(data);

    this.users.push(newUser);

    return newUser;
  }
}

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

test("should create user", async () => {
  const { usecase, payload } = makeSut();

  const newUser = await usecase.execute(payload);

  expect(newUser).not.toStrictEqual(undefined);
  expect(typeof newUser).toStrictEqual("object");
  expect(newUser.name).toStrictEqual(payload.name);
  expect(newUser.email).toStrictEqual(payload.email);
  expect(newUser.password).toStrictEqual(undefined);
});
