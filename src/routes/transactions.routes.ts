import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository'
import CreateTransactionService from '../services/CreateTransactionService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const transactionsRouter = Router();

transactionsRouter.use(ensureAuthenticated)

transactionsRouter.get('/', async (request, response) => {
  const { id } = request.user

  const transactionsRepository = getCustomRepository(TransactionsRepository)

  const transactions = await transactionsRepository.find({
    where: { user_id: id}
  })

  return response.json(transactions)
});

transactionsRouter.post('/', async (request, response) => {
  const { user_id, type, value, cpf } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    user_id,
    type,
    value,
    cpf
  })

  return response.json(transaction)
});

export default transactionsRouter;
