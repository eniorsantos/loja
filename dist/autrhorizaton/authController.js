"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.register = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (request, response) => {
    const userBody = request.body;
    userBody.passwd = bcryptjs_1.default.hashSync(userBody.passwd, 5);
    await userModel_1.default.create(userBody);
    return response.status(201).json({ message: 'ok' });
};
exports.register = register;
const authenticate = async (request, response) => {
    try {
        const body = request.body;
        const usuario = await userModel_1.default.findOne({ email: body.email });
        if (!usuario) {
            return response.status(404).json({ message: "Usuario não cadastrado!" });
        }
        const testpasswd = bcryptjs_1.default.compareSync(body.passwd, usuario.passwd);
        if (!testpasswd) {
            return response
                .status(400)
                .json({ message: "Senha e/ou e-mail incorretos!" });
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario._id }, process.env.SECRET_KEY || " ");
        return response
            .status(201)
            .json({ email: usuario.email, nome: usuario.nome, token: token });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: "Erro ao carregar dados " + error });
    }
};
exports.authenticate = authenticate;
