import { Router } from "express";
import { ExpressHttpAdapter } from "../../adapters/http/express";
import { CreateUser } from "../../../application/usecases/create-user";

import { MongooseDbUserRepository } from "../../../infra/database/mongoose/repositories/user";
import { BcryptHashHelper } from "../../../infra/bcrypt/helpers/hash";
import { Login } from "../../../application/usecases/login";
import { JoseJWTAuthHelper } from "../../../infra/jwt/helpers/auth";

const router = Router();

const adapter = new ExpressHttpAdapter();

const mongooseDbUserRepository = new MongooseDbUserRepository();
const bcryptHashHelper = new BcryptHashHelper();
const joseJWTAuthHelper = new JoseJWTAuthHelper();

const createUser = new CreateUser(mongooseDbUserRepository, bcryptHashHelper);
const login = new Login(
  mongooseDbUserRepository,
  bcryptHashHelper,
  joseJWTAuthHelper
);

router.post("/user", adapter.adapt(createUser, 201));
router.post("/login", adapter.adapt(login, 200));

export { router };
