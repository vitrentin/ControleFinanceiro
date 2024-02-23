import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class ShowMessagesByEmailService {
  async execute(email) {
    const messages = await prismaCLient.messages.findMany({
      where: {
        email,
      },
    });

    if (!messages) {
      throw new AppError('Something went wrong');
    }

    return messages;
  }
}

export { ShowMessagesByEmailService };
