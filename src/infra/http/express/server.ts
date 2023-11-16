import express from "express";
import { log } from "../../../application/helpers/log";

export class ExpressHttpServer {
  constructor(private readonly server = express()) {
    this.loadMiddleware();
  }

  loadMiddleware() {
    this.server.use(express.json());
  }

  routes(router: express.Router) {
    this.server.use(router);
  }

  listen(port: number) {
    this.server.listen(port, () => {
      log(`Server running at port ${port}`);
    });
  }
}
