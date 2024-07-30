import { Request, Response } from 'express';
import userModel from '../model/userModel';
import bcryptjs from 'bcryptjs';

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

type Acesso = {
  email: string;
  passwd: string;
};
export const authenticate = async (request: Request, response: Response) => {
  const acesso: Acesso = request.body;
  const user = await userModel.findOne({ email: acesso.email });

  return response.status(201).json({ user });

  //console.log(acesso)

  //

  // const validador = bcryptjs.compareSync(acesso.passwd, user.passwd)

  //

  return response.status(200).json({ message: 'ok' });
};
