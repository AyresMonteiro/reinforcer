import { HashStringAction } from "../../../../data/string/hash";

export class MockHashStringHelper implements HashStringAction {
  async hash(data: string): Promise<string> {
    let hashStr = "";

    for (let i = 0; i < data.length; i++) {
      hashStr += String(data[i].charCodeAt(0) << 2);
    }

    return hashStr;
  }
}
