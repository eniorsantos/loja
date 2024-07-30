import { Request, Response } from 'express';
import livroSchema from '../model/livroModel';

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
  autor: string;
  categoria: string;
}

export const cadastro = async (request: Request, response: Response) => {
  try {
    const cad: cadastroBody = request.body;
    await livroSchema.create(cad);
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
