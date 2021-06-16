import { getRepository } from 'typeorm';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

interface Response {
  id: string,
  name: string,
  cpf: string,
  balance: number,
  created_at: Date,
  updated_at: Date,
}

class ListUserDataService {
  public async execute({ id }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new AppError('Erro interno.', 401);
    }

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      balance: user.balance,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    return userWithoutPassword 
  }
}

export default ListUserDataService;