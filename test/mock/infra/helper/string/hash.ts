import { CompareHashStringAction } from "../../../../data/string/compare-hash";
import { HashStringAction } from "../../../../data/string/hash";

export class MockHashStringHelper
  implements HashStringAction, CompareHashStringAction
{
  async hash(data: string): Promise<string> {
    let hashStr = "";

    for (let i = 0; i < data.length; i++) {
      hashStr += String(data[i].charCodeAt(0) << 2);
    }

    return hashStr;
  }

  async compare(string: string, hash: string): Promise<boolean> {
    const hashStr = await this.hash(string);

    return hashStr === hash;
  }
}
