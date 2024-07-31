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
import { jwtverify } from '../src/middle/security';
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

app.get('/autor', jwtverify, autor);

app.post('/cadautor', cadautor);

app.put('/atucadautor', atucadautor);

app.delete('/delautor', delautor);

//GERENCIA CATEGORIA

app.get('/categoria', jwtverify, categoria);

app.post('/cadcategoria', jwtverify, cadcategoria);

app.put('/atucategoria', atucategoria);

app.delete('/delcategoria', delcategoria);

// GERENCIA LIVRO

app.get('/livro', jwtverify, livro);

app.post('/cadastro', jwtverify, cadastro);

app.put('/atualizacad', atualizacad);

app.delete('/dellivro', dellivro);

// GERENCIA USUARIO

app.post('/registro', register);

app.post('/auth', authenticate);
