import prismaClient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class AuthenticateUserService {
  async execute({ email, password }) {
    const user = await prismaClient.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Username or password invalid!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Username or password invalid!');
    }

    const token = sign({ email, id: user.id }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '5d',
    });

    return { user: { name: user.name, id: user.id }, token };
  }
}
