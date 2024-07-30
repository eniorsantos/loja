import {Schema, model}from "mongoose"

const autorSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Autor', autorSchema);