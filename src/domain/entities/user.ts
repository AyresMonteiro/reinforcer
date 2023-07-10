import { User } from "../types/user";

export class UserEntity implements User {
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
