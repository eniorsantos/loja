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


export const atucategoria = async(request: Request, response: Response) => {
  try {
    

    await categoriaSchema.findByIdAndUpdate({_id:request.params.id},{nome:request.body.nome})

    return response.status(201).json({ message: 'ok' });
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Erro ao atualizar casdastro! ' + error });
  }
};

export const delcategoria = async(request: Request, response: Response) => {
  try {
    

    await categoriaSchema.findByIdAndDelete({_id:request.params.id})
    return response.status(201).json({ message: 'ok' });
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Erro ao deletar casdastro! ' + error });
  }
};
