"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delcategoria = exports.atucategoria = exports.cadcategoria = exports.categoria = void 0;
const categoriaModel_1 = __importDefault(require("../model/categoriaModel"));
// Requisições Busca
const categoria = async (request, response) => {
    try {
        const categorias = await categoriaModel_1.default.find();
        return response.status(200).json(categorias);
    }
    catch (error) {
        return response.status(500).json({ message: 'Erro na busca! ' + error });
    }
};
exports.categoria = categoria;
// Requisições Cadastro/ Atualização/ Delete
const cadcategoria = async (request, response) => {
    try {
        const categoriaBody = request.body;
        await categoriaModel_1.default.create(categoriaBody);
        return response.status(201).json({ message: 'ok' });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: 'Erro no casdastro! ' + error });
    }
};
exports.cadcategoria = cadcategoria;
const atucategoria = async (request, response) => {
    try {
        await categoriaModel_1.default.findByIdAndUpdate({ _id: request.params.id }, { nome: request.body.nome });
        return response.status(201).json({ message: 'ok' });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: 'Erro ao atualizar casdastro! ' + error });
    }
};
exports.atucategoria = atucategoria;
const delcategoria = async (request, response) => {
    try {
        await categoriaModel_1.default.findByIdAndDelete({ _id: request.params.id });
        return response.status(201).json({ message: 'ok' });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: 'Erro ao deletar casdastro! ' + error });
    }
};
exports.delcategoria = delcategoria;
