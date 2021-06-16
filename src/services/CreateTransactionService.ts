import { getCustomRepository, getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import User from '../models/User';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  user_id: string;
  type: boolean;
  value: number;
  cpf: string;
}

interface TransactionResponseProps extends Omit<
Transaction,
'id' | 'created_at' | 'updated_at' | 'user'
> {
  balance: number;
}

class CreateTransactionService {
  public async execute({ user_id, type, value, cpf }: RequestDTO): Promise<TransactionResponseProps> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { id: user_id }}) 

    if (!user) {
      throw new AppError('Erro de interno.', 401)
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

    const transactionResponse = {
      user_id: transaction.user_id,
      type: transaction.type,
      value: transaction.value,
      balance: user.balance
    }

    return transactionResponse
  }
}

export default CreateTransactionService;