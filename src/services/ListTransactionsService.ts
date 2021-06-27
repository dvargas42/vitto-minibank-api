import { getCustomRepository } from "typeorm";

import { Transaction } from "../models/Transaction";
import { TransactionsRepository } from '../repositories/TransactionsRepository'

interface IRequest {
  id: string
}

type IResponse = Omit<Transaction, 'user'>[]

class ListTransactionsService {
  public async execute({ id }: IRequest): Promise<IResponse> {
    const transactionsRepository = getCustomRepository(TransactionsRepository)

    let transactions = await transactionsRepository.find({ where: {user_id: id}})

    if (!transactions) {
      transactions = []
    }

    return transactions
  }
}

export default ListTransactionsService