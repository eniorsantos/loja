import { Request, Response } from 'express';
import autorSchema from '../model/autorModel';

export const autor = async (request: Request, response: Response) => {
  try {
    const autores = await autorSchema.find();

    return response.status(200).json(autores);
  } catch (error) {
    return response.status(500).json({ message: 'Erro na busca! ' + error });
  }
};

type Autor =  {
  nome: string;
}

export const cadautor = async (request: Request, response: Response) => {
  try {
    const autor: Autor = request.body;

    console.log(autor);

    await autorSchema.create({nome: autor.nome});

    return response.status(201).json({ message: 'ok' });
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Erro no casdastro! ' + error });
  }
};

export const atucadautor = (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
};

export const delautor = (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
};
