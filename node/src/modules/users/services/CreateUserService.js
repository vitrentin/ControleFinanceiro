import prismaClient from '../../../databases/prismaClient';
import { hash } from 'bcrypt';
import AppError from '../../../shared/errors/AppError';

export class CreateUserService {
  async execute({ name, email, password }) {
    const userExist = await prismaClient.users.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new AppError('User already exists.');
    }

    const hashPassword = await hash(password, 10);

    const user = await prismaClient.users.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return userResponse;
  }
}
