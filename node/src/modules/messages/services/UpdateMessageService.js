import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class UpdateMessageService {
  async execute(message, id) {
    const checkIfMessageExists = await prismaCLient.messages.findFirst({
      where: {
        id,
      },
    });

    if (!checkIfMessageExists) {
      throw new AppError('Message does not exist');
    }

    const updatedMessage = await prismaCLient.messages.update({
      where: {
        id,
      },
      data: {
        name: message.name,
        email: email.email,
        message: message.message,
      },
    });

    return updatedMessage;
  }
}

export { UpdateMessageService };
