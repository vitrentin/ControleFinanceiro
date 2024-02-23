import AppError from "../shared/errors/AppError";
const db = require('../databases/db')
export class DeleteUserService {
  async execute(id) {
    const checkIfUserExists = await db.query("SELECT * FROM users WHERE id = ?", [id])
    
        if (checkIfUserExists.length == 0) {
          throw new AppError('User does not exist');
        }
    
        await db.query("DELETE FROM users WHERE id = ?", [id])
    
        const deleted = checkIfUserExists[0]
    
        return deleted;
    
  }
}
