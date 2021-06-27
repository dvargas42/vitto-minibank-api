import { getCustomRepository, getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import { User } from '../models/User';
import { classToPlain,  } from 'class-transformer';
import { UsersRepository } from '../repositories/UsersRepository';

interface IRequest {
  cpf: string;
  password: string;
}

interface IResponse {
  user: Omit<User, 'password'>;
  token: string;
}

class AuthenticateUserService {
  public async execute({ cpf, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { cpf } });

    if (!user) {
      throw new AppError('CPF ou senha incorretos.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('CPF ou senha incorretos.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: classToPlain(user) as Omit<User, 'password'>,
      token,
    };
  }
}

export default AuthenticateUserService;
