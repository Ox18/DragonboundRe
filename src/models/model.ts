const mongoose = require("mongoose");
import { Schema } from "mongoose";

type ParamsModel = {
  connection: string;
  schema: Schema;
  collection: string;
}

export const Model = ({ connection, schema, collection }: ParamsModel) => {
  const connectionModel = mongoose.createConnection(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connectionModel.model(collection, schema);
}
