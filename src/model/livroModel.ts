import {Schema, model}from "mongoose"

const livroSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  isdn: {
    type: Number,
    required: true,
    unique: true,
  },
  preco :{
    type: Number,
    required: true
  },
  autor:{
    type: Schema.Types.ObjectId,
    ref: 'Autor',
    required: true,
  },
  categoria:{
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  usuario:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{ timestamps: true }
);

export default model('Livro',livroSchema);