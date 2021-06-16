import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import ListUserDataService from '../services/ListUserDataService';

const usersRouter = Router();

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const { id } = request.user;

  const listUser = new ListUserDataService()

  const user = await listUser.execute({ id })

  return response.json(user);
});

usersRouter.post('/', async (request, response) => {
    const { name, cpf, password } = request.body;

    const createUser = new CreateUserService();

    const userData = await createUser.execute({
      name,
      cpf,
      password,
    });


    return response.json(userData);
});

export default usersRouter;
