import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class ShowAllMessagesService {
  async execute() {
    const messages = await prismaCLient.messages.findMany();

    if (!messages) {
      throw new AppError('Something went wrong');
    }

    return messages;
  }
}

export { ShowAllMessagesService };
