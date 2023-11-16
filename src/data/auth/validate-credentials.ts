import { Authorization } from "../types/auth/authorization";

export interface ValidateCredentialsAction {
  validate(session: string): Promise<Authorization | null>;
}
