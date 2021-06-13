import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    const { name, cpf, password } = request.body;

    const createUser = new CreateUserService();

    const userData = await createUser.execute({
      name,
      cpf,
      password,
    });

    const userWithoutPassword = {
      id: userData.id,
      name: userData.name,
      cpf: userData.cpf,
    };

    return response.json(userWithoutPassword);
});

export default usersRouter;
