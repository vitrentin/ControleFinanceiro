import prismaClient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

export class DeleteUserService {
  async execute(id) {
    const userExist = await prismaClient.users.findFirst({
      where: {
        id,
      },
    });

    if (!userExist) {
      throw new AppError('User does not exists.');
    }

    await prismaClient.users.delete({
      where: { id },
    });
  }
}
