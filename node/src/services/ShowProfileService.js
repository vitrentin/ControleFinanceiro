import AppError from "../shared/errors/AppError";
const db = require('../databases/db')
export class ShowUserService {
  async execute(id) {
    const user = await db.query("SELECT * FROM users WHERE id = ?", [id])

    if (user.length === 0) {
      throw new AppError('User does not exist');
    }
    const userReturn = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    }
    return userReturn;
  }
}
