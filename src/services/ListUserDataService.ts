import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import { User } from '../models/User';
import { classToPlain } from 'class-transformer';
import { UsersRepository } from '../repositories/UsersRepository';

interface IRequest {
  id: string;
}

type IResponse = Omit<User, 'password' | 'cpf'>

class ListUserDataService {
  public async execute({ id }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new AppError('Erro interno.', 401);
    }

    return classToPlain(user) as IResponse
  }
}

export default ListUserDataService;