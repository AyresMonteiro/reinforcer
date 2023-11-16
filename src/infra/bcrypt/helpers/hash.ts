import bcrypt from "bcrypt";

import { HashStringAction } from "../../../data/string/hash";
import { CompareHashStringAction } from "../../../data/string/compare-hash";

export class BcryptHashHelper
  implements HashStringAction, CompareHashStringAction
{
  async hash(data: string): Promise<string> {
    const hash = await bcrypt.hash(data, 10);

    return hash;
  }

  async compare(string: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(string, hash);

    return isValid;
  }
}
