import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface RequestDTO {
  name: string;
  cpf: string;
  password: string;
}

type UserProps = Omit < User, 'password' | 'created_at' | 'updated_at'>

const promotionBalance = 300

class CreateUserService {
  public async execute({ name, cpf, password }: RequestDTO): Promise<UserProps> {

    const usersRepository = getRepository(User);

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

    const userTotalData = await usersRepository.findOne({
      where: {
        cpf: user.cpf
      }
    })

    if (!userTotalData) {
      throw new AppError('Erro de conexão!')
    }

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      balance: user.balance,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    return userWithoutPassword;
  }
}

export default CreateUserService;
