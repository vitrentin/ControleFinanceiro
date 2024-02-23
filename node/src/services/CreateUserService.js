import { hash } from "bcrypt";
import AppError from "../shared/errors/AppError";
const db = require('../databases/db')
export class CreateUserService {
  async execute({ name, email, password }) {
    
    const checkIfUserExists = await db.query("SELECT * FROM users WHERE email = ?", [email])
      if (checkIfUserExists[0] != undefined) {
          throw new AppError("User already exists.");
        }
  
    const hashPassword = await hash(password, 10);
    const newUser =  await db.query("INSERT INTO users(name,email,password) VALUES(?,?,?)", 
        [name,email,hashPassword])
        const userResponse = {
            id: newUser.insertId,
            name: name,
            email: email,
          }
          
          return userResponse;
        
  }
}

