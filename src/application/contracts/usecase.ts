export interface Usecase<Input, Output> {
  execute(data: Input): Promise<Output>;
}
