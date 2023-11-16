import { Request, Response } from "express";
import { Usecase } from "../../../application/contracts/usecase";

import { Authenticate } from "../../../application/usecases/authenticate";
import { JoseJWTAuthHelper } from "../../../infra/jwt/helpers/auth";
import { Validator } from "../../../application/validation/validator";
import { log } from "../../../application/helpers/log";

export class ExpressHttpAdapter {
  constructor(
    private readonly authenticate: Authenticate = new Authenticate(
      new JoseJWTAuthHelper()
    )
  ) {}

  adapt(usecase: Usecase<any, any>, successStatus = 200) {
    return async (request: Request, response: Response) => {
      try {
        const { body } = request;

        const result = await usecase.execute(body);

        return response.status(successStatus).json(result);
      } catch (error: unknown) {
        log("Error:", error);

        if ((error as Error)?.message) {
          return response
            .status(500)
            .json({ message: (error as Error).message });
        }

        return response.status(500).json({ message: "Internal server error" });
      }
    };
  }

  adaptAuthenticated(usecase: Usecase<any, any>, successStatus = 200) {
    return async (request: Request, response: Response) => {
      const unauthorized = () =>
        response.status(401).json({ message: "Unauthorized" });

      try {
        const { authorization } = request.headers;

        if (!authorization) return unauthorized();

        const authArray = authorization.split(" ");

        if (authArray.length !== 2) return unauthorized();

        const [bearer, token] = authArray;

        if (bearer !== "Bearer") return unauthorized();

        const result = await this.authenticate.execute({ session: token });

        if (!result) return unauthorized();

        const { body } = request;

        const usecaseResult = await usecase.execute(body);

        return response.status(successStatus).json(usecaseResult);
      } catch (error: unknown) {
        log("Error:", error);

        if ((error as Error)?.message === "Invalid session")
          return unauthorized();

        return response.status(500).json({ message: "Internal server error" });
      }
    };
  }

  adaptValidator(validator: Validator) {
    return async (request: Request, response: Response, next: any) => {
      const { body } = request;

      const isValid = await validator.validate(body);

      const requestError = () =>
        response.status(400).json({ message: "Invalid request body" });

      if (!isValid) return requestError();

      return next();
    };
  }
}
