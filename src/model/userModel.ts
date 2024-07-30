import { Schema, model } from 'mongoose';

const userModel = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    passwd: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('User', userModel);
