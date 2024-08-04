import { Request, Response } from "express";
import autorSchema from "../model/autorModel";

// Requisições Busca

export const autor = async (request: Request, response: Response) => {
  try {
    const autores = await autorSchema.find();

    return response.status(200).json(autores);
  } catch (error) {
    return response.status(500).json({ message: "Erro na busca! " + error });
  }
};

type Autor = {
  nome: string;
};

// Requisições Cadastro/ Atualização/ Delete

export const cadautor = async (request: Request, response: Response) => {
  const autor: Autor = request.body;
  try {
    await autorSchema.create({ nome: autor.nome });

    return response.status(201).json({ message: "ok" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro no casdastro! " + error });
  }
};

export const atucadautor = async (request: Request, response: Response) => {
  try {
    await autorSchema.findByIdAndUpdate({_id:request.params.id}, {nome:request.body.nome});

    return response.status(201).json({ message: "ok" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro ao atualizar casdastro! " + error });
  }
};

export const delautor = async (request: Request, response: Response) => {
  try {
    await autorSchema.findByIdAndDelete({_id:request.params.id});

    return response.status(201).json({ message: "ok" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro deletar casdastro! " + error });
  }
};
