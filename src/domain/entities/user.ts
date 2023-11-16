import { User } from "../types/user";

export class UserEntity implements User {
  constructor(private readonly data: User) {}

  get id(): string {
    return this.data["id"];
  }

  get name(): string {
    return this.data["name"];
  }

  get email(): string {
    return this.data["email"];
  }

  get password(): string {
    return this.data["password"] ?? "";
  }

  plain() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
