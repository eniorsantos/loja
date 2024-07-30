import { Schema, model } from 'mongoose';

const categoriaSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Categoria', categoriaSchema);
