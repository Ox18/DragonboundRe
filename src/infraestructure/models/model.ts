import mongoose from "mongoose";
import { Schema } from "mongoose";

type ParamsModel = {
  connection: string;
  schema: Schema;
  collection: string;
}

export function Model<T = any>(params: ParamsModel) {
  const connectionModel = mongoose.createConnection(params.connection, {
  });

  return connectionModel.model<T>(params.collection, params.schema);
}