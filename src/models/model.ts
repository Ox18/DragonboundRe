const mongoose = require("mongoose");
import { Schema } from "mongoose";

type ParamsModel = {
  connection: string;
  schema: Schema;
  collection: string;
}

export function Model(params: ParamsModel) {
  const connectionModel = mongoose.createConnection(params.connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connectionModel.model(params.collection, params.schema);
}