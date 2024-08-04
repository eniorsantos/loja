"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delautor = exports.atucadautor = exports.cadautor = exports.autor = void 0;
const autorModel_1 = __importDefault(require("../model/autorModel"));
// Requisições Busca
const autor = async (request, response) => {
    try {
        const autores = await autorModel_1.default.find();
        return response.status(200).json(autores);
    }
    catch (error) {
        return response.status(500).json({ message: "Erro na busca! " + error });
    }
};
exports.autor = autor;
// Requisições Cadastro/ Atualização/ Delete
const cadautor = async (request, response) => {
    const autor = request.body;
    try {
        await autorModel_1.default.create({ nome: autor.nome });
        return response.status(201).json({ message: "ok" });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: "Erro no casdastro! " + error });
    }
};
exports.cadautor = cadautor;
const atucadautor = async (request, response) => {
    try {
        await autorModel_1.default.findByIdAndUpdate({ _id: request.params.id }, { nome: request.body.nome });
        return response.status(201).json({ message: "ok" });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: "Erro ao atualizar casdastro! " + error });
    }
};
exports.atucadautor = atucadautor;
const delautor = async (request, response) => {
    try {
        await autorModel_1.default.findByIdAndDelete({ _id: request.params.id });
        return response.status(201).json({ message: "ok" });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: "Erro deletar casdastro! " + error });
    }
};
exports.delautor = delautor;
