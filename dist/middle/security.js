"use strict";
// FUNÇÃO PARA CONTROLE E AUTENTICAÇÃO DE USUARIO
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtverify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtverify = (request, response, next) => {
    try {
        const token = request.headers?.authorization;
        if (!token) {
            return response.status(500).json({ message: 'Usuario não autorizado ' });
        }
        const validador = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || '');
        if (!validador) {
            return response.status(500).json({ message: 'Usuario não autorizado ' });
        }
        next();
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: 'Erro ao carregar dados ' + error });
    }
};
exports.jwtverify = jwtverify;
