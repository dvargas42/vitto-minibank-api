import { getCustomRepository } from 'typeorm'
import { classToPlain } from 'class-transformer'
import { hash } from 'bcryptjs'

import AppError from '../errors/AppError'

import { User } from '../models/User'
import { UsersRepository } from '../repositories/UsersRepository'

interface IRequest {
  name: string;
  cpf: string;
  password: string;
}

type IResponse = Omit<User, 'password'>

const promotionBalance = 300

class CreateUserService {
  public async execute({ name, cpf, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    
    const checkUserExists = await usersRepository.findOne({
      where: { cpf },
    })

    if (checkUserExists) {
      throw new AppError('CPF já cadastrado.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      cpf,
      balance: promotionBalance,
      password: hashedPassword,
    })

    await usersRepository.save(user);

    const userData = await usersRepository.findOne({
      where: {
        cpf: user.cpf
      }
    })

    if (!userData) {
      throw new AppError('Erro de conexão!')
    }

    return classToPlain(userData) as Omit<User, 'password'>;
  }
}

export default CreateUserService;
