import { Request, Response } from 'express';
import livroSchema from '../model/livroModel';
import jwt from 'jsonwebtoken';

import {ref, getStorage, getDownloadURL, uploadBytesResumable} from "firebase/storage"

export const livro = async (request: Request, response: Response) => {
  try {
    const livros = await livroSchema.find();

    return response.status(200).json(livros);
  } catch (error) {
    return response.status(500).json({ message: 'Erro na busca! ' + error });
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
  
    const cad: cadastroBody = request.body;

    const image = request.file;

    const token = request.headers?.authorization || '';
    
    const storage = getStorage();

  try {

    

    const validador = jwt.verify(
      token,
      process.env.SECRET_KEY || ''
    ) as Decoder;

    cad.usuario = validador.id;    

    await livroSchema.create({
      nome: cad.nome,
      isdn: cad.isdn,
      preco: cad.preco,
      linkimagem: cad.linkimagem,
      autor: cad.autor,
      categoria: cad.categoria,
      usuario: cad.usuario,
    });
    return response.status(201).json({ message: 'ok' });
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Erro no cadastro do livro! ' + error });
  }
};

export const atualizacad = (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
};

export const dellivro = (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
};
