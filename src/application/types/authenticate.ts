import { Authorization } from "../../data/types/auth/authorization";

export type AuthenticateData = Pick<Authorization, "session">;
