import { Router } from 'express';

import usersRouter from './users.routes'
import transactionsRouter from './transactions.routes'
import sessionsRouter from './sessions.routes';

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/transactions', transactionsRouter)
routes.use('/sessions', sessionsRouter);

export default routes