import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import AppError from '../../../shared/errors/AppError';
const db = require('../databases/db')
export class RegisterServices {
    async createUser(user) {
        const newUser =  await db.query("INSERT INTO users(name,email,password)VALUES(?,?,?)", 
        [user.name,user.email,user.password])
    
        let newUsered =  await db.query("SELECT * FROM users ORDER BY id DESC LIMIT 1")
        newUsered = newUsered[0]
        
        return newUsered;
      }
      async deleteUser(id) {
        const checkIfUserExists = await db.query("SELECT * FROM users WHERE id = ?", [id])
    
        if (checkIfUserExists.length == 0) {
          throw new AppError('User does not exist');
        }
    
        const deletedUser = await db.query("DELETE FROM users WHERE id = ?", [id])
    
        const deleted = checkIfUserExists[0]
    
        return deleted;
      }
      async showAllUser() {
        const users = await db.query("SELECT * FROM users");

        return users;
      }
      async showUser(id) {
        const user = await db.query("SELECT * FROM users WHERE id = ?", id)
    
        if (user.length === 0) {
          throw new AppError('User does not exist');
        }
    
        return user;
      }
      async showUser(user, id) {
        const checkIfUserExists = await db.query("SELECT * FROM users WHERE id = ?", id)
    
        if (checkIfUserExists.length == 0) {
          throw new AppError('User does not exist');
        }
    
        let updatedUsers = await db.query("UPDATE users SET name = ?,email = ?, password = ? WHERE id = ?",
        [user.name,user.email,user.password, id])
        
        updatedUsers = await db.query("SELECT * FROM users WHERE id = ?", id)
        const updatedUser = updatedUsers[0]
        return updatedUser;
      }
      async updateUser(user, id) {
        const checkIfUserExists = await db.query("SELECT * FROM users WHERE id = ?", [id])
    
        if (checkIfUserExists.length == 0) {
          throw new AppError('User does not exist');
        }
        old_password  = user.password
        let updatedUsers = await db.query("UPDATE Users SET name = ?,email = ?,passwword = ? WHERE id = ?",
        [user.name,user.email,user.password, id])
        if (updatedUsers && updatedUsers.id !== id) {
            throw new AppError('This user is already in use!');
          }
        updatedUsers = await db.query("SELECT * FROM users WHERE id = ?", [id])
        const updatedUser = updatedUsers[0]
        
        if (password && !old_password) {
            throw new AppError(
              'You need to inform the old password to set a new password'
            );
          }
          password = updatedUser.password
          if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
      
            if (!checkOldPassword) {
              throw new AppError('Old Password does not match!');
            }
      
            user.password = await hash(password, 10);
          }
        return updatedUser;
      }
      async AuthenticateUser(user){
        if (!user) {
            throw new AppError('Username or password invalid!');
          }
      
          const passwordMatch = await compare(password, user.password);
      
          if (!passwordMatch) {
            throw new AppError('Username or password invalid!');
          }
      
          const token = sign({ email, id: user.id }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '5d',
          });
      
          return { user: { name: user.name, id: user.id }, token };
      }
  }
  export {RegisterServices}