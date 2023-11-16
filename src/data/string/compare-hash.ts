export interface CompareHashStringAction {
  compare(string: string, hash: string): Promise<boolean>;
}
