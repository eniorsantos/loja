import { Request, Response } from "express";
import livroSchema from "../model/livroModel";
import jwt from "jsonwebtoken";

import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export const livro = async (request: Request, response: Response) => {
  const nomeProduto = request.query?.nomeProduto as string;

  try {
    const livros = await livroSchema.find({
      nome: { $regex: new RegExp(nomeProduto, "i") },
    });

    return response.status(200).json(livros);
  } catch (error) {
    return response.status(500).json({ message: "Erro na busca! " + error });
  }
};

export const livrorecentes = async (request: Request, response: Response) => {
  try {
    const livros = await livroSchema.find().sort({ createdAt: -1 }).limit(10);

    return response.status(200).json(livros);
  } catch (error) {
    return response.status(500).json({ message: "Erro na busca! " + error });
  }
};

export const livroporcategoria = async (
  request: Request,
  response: Response
) => {
  const categoria = request.params.categoria;

  try {
    const livros = await livroSchema.find({ categoria: categoria });

    return response.status(200).json(livros);
  } catch (error) {
    return response.status(500).json({ message: "Erro na busca! " + error });
  }
};

interface cadastroBody {
  nome: string;
  isdn: number;
  preco: number;
  linkimagem: string;
  autor: string;
  categoria: string;
  usuario: number;
}

type Decoder = {
  id: number;
};

export const cadastro = async (request: Request, response: Response) => {
  const storage = getStorage();

  const cad: cadastroBody = request.body;

  const token = request.headers?.authorization || "";

  const image = request.file;

  if (!request.file?.buffer) {
    return response.status(400).json({ message: "Envie uma imagem valida" });
  }

  try {
    const storeageRef = ref(
      storage,
      `files/${request.file?.originalname}${Date.now()}`
    );

    const snapshot = await uploadBytesResumable(
      storeageRef,
      request.file?.buffer,
      {
        contentType: request.file?.mimetype,
      }
    );

    const downloadUrl = await getDownloadURL(snapshot.ref);

    const validador = jwt.verify(
      token,
      process.env.SECRET_KEY || ""
    ) as Decoder;

    cad.usuario = validador.id;
    cad.linkimagem = downloadUrl;

    await livroSchema.create({
      nome: cad.nome,
      isdn: cad.isdn,
      preco: cad.preco,
      linkimagem: cad.linkimagem,
      autor: cad.autor,
      categoria: cad.categoria,
      usuario: cad.usuario,
    });
    return response.status(201).json({ message: "ok" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro no cadastro do livro! " + error });
  }
};

export const atualizacad = async (request: Request, response: Response) => {
  const storage = getStorage();

  const cad: cadastroBody = request.body;

  const token = request.headers?.authorization || "";

  const image = request.file;

  console.log(request.params.id)
  console.log(cad)

  try {

    if (!request.file) {
      await livroSchema.findByIdAndUpdate({ _id: request.params.id }, { cad });
      return response.status(200).json({ message: "ok" });
    }
    if (!request.file?.buffer) {
      return response.status(400).json({ message: "Envie uma imagem valida" });
    }

    const storeageRef = ref(
      storage,
      `files/${request.file?.originalname}${Date.now()}`
    );

    const snapshot = await uploadBytesResumable(
      storeageRef,
      request.file?.buffer,
      {
        contentType: request.file?.mimetype,
      }
    );

    const downloadUrl = await getDownloadURL(snapshot.ref);

    cad.linkimagem = downloadUrl;
    console.log(request.params.id)
  console.log(cad)

    await livroSchema.findByIdAndUpdate({ _id:request.params.id }, { cad });
    return response.status(200).json({ message: "ok" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro ao excluir o livro! " + error });
  }
};

export const dellivro = async (request: Request, response: Response) => {
  try {
    await livroSchema.findByIdAndDelete({ _id: request.params.id });

    return response.status(201).json({ message: "ok" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro ao deletar livro! " + error });
  }
};
