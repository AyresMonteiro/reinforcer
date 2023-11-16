import { configMongoose } from "../infra/database/mongoose/config";
import { getEnvironmentVariable } from "../infra/environment/get-variable";
import { ExpressHttpServer } from "../infra/http/express/server";

import { router } from "./routes/http/express";

export class ReinforcerApp {
  constructor(private readonly server = new ExpressHttpServer()) {}

  async start() {
    await configMongoose();

    this.server.routes(router);

    this.server.listen(Number(getEnvironmentVariable("PORT")));
  }
}
