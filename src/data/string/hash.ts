export interface HashStringAction {
  hash(data: string): Promise<string>;
}
