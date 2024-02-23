const db = require('../databases/db')
import AppError from "../shared/errors/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export class AuthenticateUserService {
    async execute({email, password}) {
    const user = (await db.query("SELECT * FROM users WHERE email = ?", email))[0];
    if (!user) {
        throw new AppError('Username or password invalid!');
      }

      const passwordMatch = await compare(password, user.password);

  
      if (!passwordMatch) {
        throw new AppError('Username or password invalid!');
      }

    const token = sign({ email, id: user.id }, process.env.JWT_SECRET, {
        subject: String(user.id),
        expiresIn: '5d',
      });
  
      return { user: { name: user.name, id: user.id }, token };
  }
  }