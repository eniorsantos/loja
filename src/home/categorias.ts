import{Request, Response} from "express"
import categoriaSchema from "../model/categoriaModel"

export const categoria = async (request: Request, response: Response) => {
  try {
    const categorias = await categoriaSchema.find();

    return response.status(200).json(categorias);
  } catch (error) {
    return response.status(500).json({ message: 'Erro na busca! ' + error });
  }
};

interface Categoria{
  nome: string
}

export const cadcategoria = async (request: Request, response: Response) => {
  try {
    const categoriaBody: Categoria = request.body;

    await categoriaSchema.create(categoriaBody);

    return response.status(201).json({ message: 'ok' });
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Erro no casdastro! ' + error });
  }
};


export const atucategoria = (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
};

export const delcategoria = (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
};
