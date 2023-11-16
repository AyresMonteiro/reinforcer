import bcrypt from "bcrypt";

import { HashStringAction } from "../../../data/string/hash";

export class BcryptHashHelper implements HashStringAction {
  async hash(data: string): Promise<string> {
    const hash = await bcrypt.hash(data, 10);

    return hash;
  }
}
