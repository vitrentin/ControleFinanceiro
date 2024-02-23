import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class ShowMessageService {
  async execute(id) {
    const message = await prismaCLient.messages.findFirst({
      where: {
        id,
      },
    });

    if (!message) {
      throw new AppError('Message does not exist');
    }

    return message;
  }
}

export { ShowMessageService };
