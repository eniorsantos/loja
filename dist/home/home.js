"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dellivro = exports.atualizacad = exports.cadastro = exports.livroporcategoria = exports.livrorecentes = exports.livro = void 0;
const livroModel_1 = __importDefault(require("../model/livroModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const storage_1 = require("firebase/storage");
// Requisições de Busca de livros  
const livro = async (request, response) => {
    const nomeProduto = request.query?.nomeProduto;
    try {
        const livros = await livroModel_1.default.find({
            nome: { $regex: new RegExp(nomeProduto, "i") },
        });
        return response.status(200).json(livros);
    }
    catch (error) {
        return response.status(500).json({ message: "Erro na busca! " + error });
    }
};
exports.livro = livro;
const livrorecentes = async (request, response) => {
    try {
        const livros = await livroModel_1.default.find().sort({ createdAt: -1 }).limit(10);
        return response.status(200).json(livros);
    }
    catch (error) {
        return response.status(500).json({ message: "Erro na busca! " + error });
    }
};
exports.livrorecentes = livrorecentes;
const livroporcategoria = async (request, response) => {
    const categoria = request.params.categoria;
    try {
        const livros = await livroModel_1.default.find({ categoria: categoria });
        return response.status(200).json(livros);
    }
    catch (error) {
        return response.status(500).json({ message: "Erro na busca! " + error });
    }
};
exports.livroporcategoria = livroporcategoria;
// Requiesições de CADASTRO / ATUALIZAÇÃO E DELETE
const cadastro = async (request, response) => {
    const storage = (0, storage_1.getStorage)();
    const cad = request.body;
    const token = request.headers?.authorization || "";
    const image = request.file;
    if (!request.file?.buffer) {
        return response.status(400).json({ message: "Envie uma imagem valida" });
    }
    try {
        const storeageRef = (0, storage_1.ref)(storage, `files/${request.file?.originalname}${Date.now()}`);
        const snapshot = await (0, storage_1.uploadBytesResumable)(storeageRef, request.file?.buffer, {
            contentType: request.file?.mimetype,
        });
        const downloadUrl = await (0, storage_1.getDownloadURL)(snapshot.ref);
        const validador = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "");
        cad.usuario = validador.id;
        cad.linkimagem = downloadUrl;
        await livroModel_1.default.create({
            nome: cad.nome,
            isdn: cad.isdn,
            preco: cad.preco,
            linkimagem: cad.linkimagem,
            autor: cad.autor,
            categoria: cad.categoria,
            usuario: cad.usuario,
        });
        return response.status(201).json({ message: "ok" });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: "Erro no cadastro do livro! " + error });
    }
};
exports.cadastro = cadastro;
const atualizacad = async (request, response) => {
    const cad = request.body;
    try {
        const livroatu = await livroModel_1.default.findById(request.params.id);
        if (!livroatu) {
            return response.status(404).json({ message: " Livro nao encontrado" });
        }
        const token = request.headers?.authorization || "";
        if (!token) {
            return response.status(40).json({ message: " Usuario sem autorização" });
        }
        const image = request.file;
        const validador = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "");
        const isUserValid = livroatu.usuario.toString() === String(validador.id);
        if (!isUserValid) {
            return response.status(40).json({ message: " Usuario sem autorização" });
        }
        if (!request.file) {
            await livroModel_1.default.findByIdAndUpdate(livroatu, cad);
            return response.status(200).json({ message: "ok" });
        }
        if (!request.file?.buffer) {
            return response.status(400).json({ message: "Envie uma imagem valida" });
        }
        const storage = (0, storage_1.getStorage)();
        const storeageRef = (0, storage_1.ref)(storage, `files/${request.file?.originalname}${Date.now()}`);
        const snapshot = await (0, storage_1.uploadBytesResumable)(storeageRef, request.file?.buffer, {
            contentType: request.file?.mimetype,
        });
        const downloadUrl = await (0, storage_1.getDownloadURL)(snapshot.ref);
        cad.linkimagem = downloadUrl;
        await livroModel_1.default.findByIdAndUpdate({ _id: request.params.id }, { cad });
        return response.status(200).json({ message: "ok" });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: "Erro ao atualizar  livro! " + error });
    }
};
exports.atualizacad = atualizacad;
const dellivro = async (request, response) => {
    try {
        const livroatu = await livroModel_1.default.findById(request.params.id);
        if (!livroatu) {
            return response.status(404).json({ message: " Livro nao encontrado" });
        }
        const token = request.headers?.authorization || "";
        if (!token) {
            return response.status(40).json({ message: " Usuario sem autorização" });
        }
        const validador = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "");
        const isUserValid = livroatu.usuario.toString() === String(validador.id);
        if (!isUserValid) {
            return response.status(40).json({ message: " Usuario sem autorização" });
        }
        await livroModel_1.default.findByIdAndDelete(livroatu);
        return response.status(200).json({ message: "ok" });
    }
    catch (error) {
        return response
            .status(500)
            .json({ message: "Erro ao deletar livro! " + error });
    }
};
exports.dellivro = dellivro;
