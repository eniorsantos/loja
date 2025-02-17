import express from 'express';
import mongoose from 'mongoose';
import {initializeApp} from "firebase/app"
import config from "./config/firebase"
import multer from "multer"

import { livro, cadastro, atualizacad, dellivro, livrorecentes, livroporcategoria } from './home/home';
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
initializeApp(config.firebaseConfig)

const update = multer({storage: multer.memoryStorage()})


mongoose.connect(process.env.CONEXAO_DB || '');

// Inicializaçao Servidor

app.listen(process.env.PORT, () => {
  console.log('Executando');
});



// Rotas para gerenciamanto de AUTOR

app.get('/autor', jwtverify,autor);

app.post('/cadautor',jwtverify, cadautor);

app.put('/atucadautor/:id',jwtverify, atucadautor);

app.delete('/delautor/:id', jwtverify,delautor);



//Rotas para gerenciamanto de CATEGORIA

app.get('/categoria', jwtverify, categoria);

app.post('/cadcategoria', jwtverify, cadcategoria);

app.put('/atucategoria/:id', jwtverify,atucategoria);

app.delete('/delcategoria/:id', jwtverify,delcategoria);



// Rotas para gerenciamanto de LIVRO

app.get('/livro', jwtverify, livro);

app.get('/livrorecentes', jwtverify, livrorecentes);

app.get('/livroporcategoria/:categoria', jwtverify, livroporcategoria);

app.post('/cadastro', jwtverify,update.single("filename"), cadastro);

app.put('/atualizacad/:id',jwtverify, update.single("filename"), atualizacad);

app.delete('/dellivro/:id',jwtverify, dellivro);




// Rotas para gerenciamanto de USUARIO

app.post('/registro', register);

app.post('/auth', authenticate);
