import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer'

import AppError from '../errors/AppError';

import { Transaction } from '../models/Transaction';
import { TransactionsRepository } from '../repositories/TransactionsRepository';
import { UsersRepository } from '../repositories/UsersRepository';

interface IRequest {
  user_id: string;
  type: boolean;
  value: number;
  cpf: string;
}

interface IResponse{
  user_id: string;
  type: boolean;
  value: number;
  created_at: Date;
  balance: number;
}

class CreateTransactionService {
  public async execute({ user_id, type, value, cpf }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository)

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const user = await usersRepository.findOne({ where: { id: user_id }}) 

    if (!user) {
      throw new AppError('Erro Interno.', 401)
    }

    if (!(cpf===user.cpf)) {
      throw new AppError('CPF incorretos.', 401);
    }

    if (!type) {
      if (user.balance < value) {
        throw new AppError('Saldo insuficiente.')
      }

      user.balance = user.balance - value

    } else {
      user.balance = user.balance + value
    }
    
    const transaction = transactionsRepository.create({
      user_id,
      type,
      value,
    })

    await usersRepository.save(user)

    await transactionsRepository.save(transaction)

    return {
      ...classToPlain(transaction) as Pick<
        Transaction,
        'user_id' | 'type' | 'value' | 'created_at'
      >,
      balance: user.balance
    }
  }
}

export default CreateTransactionService;