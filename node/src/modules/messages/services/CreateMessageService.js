import prismaCLient from '../../../databases/prismaClient';

class CreateMessageService {
  async execute(message) {
    const newMessage = await prismaCLient.messages.create({
      data: {
        name: message.name,
        email: message.email,
        message: message.message,
      },
    });

    return newMessage;
  }
}

export { CreateMessageService };
