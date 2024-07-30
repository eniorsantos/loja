import express from 'express';
import mongoose from 'mongoose';
import { livro, cadastro, atualizacad, dellivro } from './home/home';
import { autor, cadautor, atucadautor, delautor } from './home/autores';
import {
  categoria,
  cadcategoria,
  atucategoria,
  delcategoria,
} from './home/categorias';
import { register, authenticate } from './autrhorizaton/authController';
import dotenv from 'dotenv';

dotenv.config();

// INSTANCIA A CONEXÃO

const app = express();
app.use(express.json());

mongoose.connect(process.env.CONEXAO_DB || '');

// GERENCIA PORTA

app.listen(3333, () => {
  console.log('Executando');
});

// GERENCIA AUTOR

app.get('/autor', autor);

app.post('/cadautor', cadautor);

app.put('/atucadautor', atucadautor);

app.delete('/delautor', delautor);

//GERENCIA CATEGORIA

app.get('/categoria', categoria);

app.post('/cadcategoria', cadcategoria);

app.put('/atucategoria', atucategoria);

app.delete('/delcategoria', delcategoria);

// GERENCIA LIVRO

app.get('/livro', livro);

app.post('/cadastro', cadastro);

app.put('/atualizacad', atualizacad);

app.delete('/dellivro', dellivro);

// GERENCIA USUARIO

app.post('/registro', register);

app.post('/auth', authenticate);
