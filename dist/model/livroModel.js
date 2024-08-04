"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const livroSchema = new mongoose_1.Schema({
    nome: {
        type: String,
        required: true,
    },
    isdn: {
        type: Number,
        required: true,
        unique: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    linkimagem: {
        type: String,
        required: false,
    },
    autor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Autor",
        required: true,
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Livro", livroSchema);
