import Joi from "joi";

import { Validator } from "../../../application/validation/validator";

export class JoiValidator implements Validator {
  constructor(private readonly schema: Joi.Schema) {}

  async validate(input: any): Promise<boolean> {
    try {
      await this.schema.validateAsync(input);

      return true;
    } catch (error: unknown) {
      return false;
    }
  }
}
