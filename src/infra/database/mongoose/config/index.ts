import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import { log } from "../../../../application/helpers/log";

export async function configMongoose() {
  const memoryServer = await MongoMemoryServer.create({
    binary: {
      version: "6.0.2",
    },
  });

  mongoose.set("strictQuery", true);

  await mongoose.connect(memoryServer.getUri());

  log("Database connected");
}
