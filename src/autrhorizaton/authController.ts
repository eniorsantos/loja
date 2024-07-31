import { Request, Response } from 'express';
import userModel from '../model/userModel';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

type Usuario = {
  nome: string;
  email: string;
  telefone: string;
  passwd: string;
};

export const register = async (request: Request, response: Response) => {
  const userBody: Usuario = request.body;

  userBody.passwd = bcryptjs.hashSync(userBody.passwd, 5);

  await userModel.create(userBody);

  return response.status(201).json({ message: 'ok' });
};

type BaseAuth = {
  email: string;
  passwd: string;
};
export const authenticate = async (request: Request, response: Response) => {
  try {
    const body: BaseAuth = request.body;
    const usuario = await userModel.findOne({ email: body.email });
    

    if (!usuario) {
      return response.status(404).json({ message: "Usuario não cadastrado!" });
    }

    const testpasswd = bcryptjs.compareSync(body.passwd, usuario.passwd);
    
    if (!testpasswd) {
      return response
        .status(400)
        .json({ message: "Senha e/ou e-mail incorretos!" });
    }

    const token = jwt.sign({id:usuario._id}, process.env.SECRET_KEY || " ")

    return response
      .status(201)
      .json({ email: usuario.email, nome: usuario.nome, token: token });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Erro ao carregar dados " + error });
  }
};
