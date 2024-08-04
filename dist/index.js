"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("firebase/app");
const firebase_1 = __importDefault(require("./config/firebase"));
const multer_1 = __importDefault(require("multer"));
const home_1 = require("./home/home");
const autores_1 = require("./home/autores");
const categorias_1 = require("./home/categorias");
const authController_1 = require("./autrhorizaton/authController");
const security_1 = require("../src/middle/security");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// INSTANCIA A CONEXÃO
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, app_1.initializeApp)(firebase_1.default.firebaseConfig);
const update = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
mongoose_1.default.connect(process.env.CONEXAO_DB || '');
// Inicializaçao Servidor
app.listen(process.env.PORT, () => {
    console.log('Executando');
});
// Rotas para gerenciamanto de AUTOR
app.get('/autor', security_1.jwtverify, autores_1.autor);
app.post('/cadautor', security_1.jwtverify, autores_1.cadautor);
app.put('/atucadautor/:id', security_1.jwtverify, autores_1.atucadautor);
app.delete('/delautor/:id', security_1.jwtverify, autores_1.delautor);
//Rotas para gerenciamanto de CATEGORIA
app.get('/categoria', security_1.jwtverify, categorias_1.categoria);
app.post('/cadcategoria', security_1.jwtverify, categorias_1.cadcategoria);
app.put('/atucategoria/:id', security_1.jwtverify, categorias_1.atucategoria);
app.delete('/delcategoria/:id', security_1.jwtverify, categorias_1.delcategoria);
// Rotas para gerenciamanto de LIVRO
app.get('/livro', security_1.jwtverify, home_1.livro);
app.get('/livrorecentes', security_1.jwtverify, home_1.livrorecentes);
app.get('/livroporcategoria/:categoria', security_1.jwtverify, home_1.livroporcategoria);
app.post('/cadastro', security_1.jwtverify, update.single("filename"), home_1.cadastro);
app.put('/atualizacad/:id', security_1.jwtverify, update.single("filename"), home_1.atualizacad);
app.delete('/dellivro/:id', security_1.jwtverify, home_1.dellivro);
// Rotas para gerenciamanto de USUARIO
app.post('/registro', authController_1.register);
app.post('/auth', authController_1.authenticate);
