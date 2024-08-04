import { Request, Response } from "express";
import livroSchema from "../model/livroModel";
import jwt from "jsonwebtoken";

import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";


// Requisições de Busca de livros  

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


// Cria tipos temporarios

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

// Requiesições de CADASTRO / ATUALIZAÇÃO E DELETE

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
  const cad = request.body;
  try {
    const livroatu = await livroSchema.findById(request.params.id);

    if (!livroatu) {
      return response.status(404).json({ message: " Livro nao encontrado" });
    }

    const token = request.headers?.authorization || "";

    if (!token) {
      return response.status(40).json({ message: " Usuario sem autorização" });
    }

    const image = request.file;

    const validador = jwt.verify(
      token,
      process.env.SECRET_KEY || ""
    ) as Decoder;

    const isUserValid = livroatu.usuario.toString() === String(validador.id);

    if (!isUserValid) {
      return response.status(40).json({ message: " Usuario sem autorização" });
    }

    if (!request.file) {
      await livroSchema.findByIdAndUpdate(livroatu, cad);
      return response.status(200).json({ message: "ok" });
    }

    if (!request.file?.buffer) {
      return response.status(400).json({ message: "Envie uma imagem valida" });
    }

    const storage = getStorage();
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
   
    await livroSchema.findByIdAndUpdate({ _id: request.params.id }, { cad });
    return response.status(200).json({ message: "ok" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro ao atualizar  livro! " + error });
  }
};

export const dellivro = async (request: Request, response: Response) => {
  try {
    const livroatu = await livroSchema.findById(request.params.id);

    if (!livroatu) {
      return response.status(404).json({ message: " Livro nao encontrado" });
    }

    const token = request.headers?.authorization || "";

    if (!token) {
      return response.status(40).json({ message: " Usuario sem autorização" });
    }
    
    const validador = jwt.verify(
      token,
      process.env.SECRET_KEY || ""
    ) as Decoder;

    const isUserValid = livroatu.usuario.toString() === String(validador.id);

    if (!isUserValid) {
      return response.status(40).json({ message: " Usuario sem autorização" });
    }

    await livroSchema.findByIdAndDelete(livroatu);
    return response.status(200).json({ message: "ok" });

  }catch(error){

    return response
      .status(500)
      .json({ message: "Erro ao deletar livro! " + error });
  }
};
