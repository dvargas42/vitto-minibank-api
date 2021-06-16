import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { cpf, password } = request.body

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    cpf,
    password,
  })
  
  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    cpf: user.cpf,
    balance: user.balance,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ user: userWithoutPassword, token });
})

export default sessionsRouter;