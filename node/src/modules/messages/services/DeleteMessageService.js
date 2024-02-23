import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class DeleteMessageService {
  async execute(id) {
    const checkIfMessageExists = await prismaCLient.messages.findFirst({
      where: {
        id,
      },
    });

    if (!checkIfMessageExists) {
      throw new AppError('Message does not exist');
    }

    const deletedMessage = await prismaCLient.messages.delete({
      where: {
        id,
      },
    });

    return deletedMessage;
  }
}

export { DeleteMessageService };
