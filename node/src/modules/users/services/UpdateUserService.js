import { hash } from 'bcrypt';
import { compare } from 'bcrypt';
import prismaCLient from '../../../databases/prismaClient';
import AppError from '../../../shared/errors/AppError';

class UpdateUserService {
  async execute({ name, email, password, old_password }, id) {
    const user = await prismaCLient.users.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError('User does not exists!', 400);
    }

    const userWithNewEmail = await prismaCLient.users.findFirst({
      where: {
        email,
      },
    });

    if (userWithNewEmail && userWithNewEmail.id !== id) {
      throw new AppError('This email is already in use!');
    }
   
    Object.assign(user, {
      ...user,
      name,
      email,
    });

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old Password does not match!');
      }

      user.password = await hash(password, 10);
    }

    const userUpdated = await prismaCLient.users.update({
      where: {
        id,
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return {
      id: userUpdated.id,
      name: userUpdated.name,
      email: userUpdated.email,
    };
  }
}

export { UpdateUserService };
