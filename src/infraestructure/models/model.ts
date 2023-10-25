import { logManager } from "@/lib/modules/log-manager.module";
import mongoose from "mongoose";
import { Schema } from "mongoose";

type ParamsModel = {
  connection: string;
  schema: Schema;
  collection: string;
};

const logger = logManager("mongo::connection");

export function Model<T = any>(params: ParamsModel) {
  const connectionModel = mongoose.createConnection(params.connection, {});

  connectionModel.on("error", (err) => {
    logger.error(err);
    logger.error("MongoDB Connection Error. Please make sure MongoDB is running.");
    logger.error(params.connection)
  });

  connectionModel.on("connected", () => {
    logger.info("MongoDB Connected >> ", params.connection);
  });

  return connectionModel.model<T>(params.collection, params.schema);
}
