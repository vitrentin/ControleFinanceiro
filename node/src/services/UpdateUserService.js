import { hash } from 'bcrypt';
import { compare } from 'bcrypt';
import AppError from '../shared/errors/AppError';
const db = require('../databases/db')
class UpdateUserService {
    
  async execute({ name, email, password, old_password }, id) {

    const user = await db.query("SELECT * FROM users WHERE id = ?", [id])

    if (user.length == 0) { 
      throw new AppError('User does not exist');
    }
    const userWithNewEmail = await db.query("SELECT * FROM users WHERE email = ?", [email])
    if (user.id && userWithNewEmail[0].id !== id) { 
        throw new AppError('This email is already in use!');
      }

    Object.assign(user, {
        ...user,
        name,
        email,
    });

    if (password && old_password) {
        const checkOldPassword = await compare(old_password, user[0].password);

  
        if (!checkOldPassword) {
          throw new AppError('Old Password does not match!');
        }
  
        user[0].password = await hash(password, 10);
    }
    let updatedUsers = await db.query("UPDATE Users SET name = ?,email = ?,password = ? WHERE id = ?",
    [user.name,user.email,user[0].password, id])
    
        return {
            id: updatedUsers.id,
            name: updatedUsers.name,
            email: updatedUsers.email,
          };
      }
  }
  
export { UpdateUserService };
