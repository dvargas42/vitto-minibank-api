import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateTransactionService from '../services/CreateTransactionService'
import ListTransactionsService from '../services/ListTransactionsService';

const transactionsRouter = Router();

transactionsRouter.use(ensureAuthenticated)

transactionsRouter.get('/', async (request, response) => {
  const { id } = request.user

  const listTransaction = new ListTransactionsService()

  const transactions = await listTransaction.execute({id}) 

  return response.json(transactions)
});

transactionsRouter.post('/', async (request, response) => {
  const { type, value, cpf } = request.body;

  const { id } = request.user

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    user_id: id,
    type,
    value,
    cpf
  })

  return response.json(transaction)
});

export default transactionsRouter;
