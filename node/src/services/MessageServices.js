import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import AppError from '../shared/errors/AppError';

const db = require('../databases/db')
export class MessageServices {
    async createMessage(message) {
        const newMessage =  await db.query("INSERT INTO messages(name,email,message)VALUES(?,?,?)", 
        [message.name,message.email,message.message])
    
        let newmessageed =  await db.query("SELECT * FROM messages ORDER BY id DESC LIMIT 1")
        newmessageed = newmessageed[0]

        return newmessageed;
      }
      async deleteMessage(id) {
        const checkIfmessageExists = await db.query("SELECT * FROM messages WHERE id = ?", [id])
    
        if (checkIfmessageExists.length == 0) {
          throw new AppError('message does not exist');
        }
    
        const deletedmessage = await db.query("DELETE FROM messages WHERE id = ?", [id])
    
       return deletedmessage;
      }
      async showAllmessage() {
        const messages = await db.query("SELECT * FROM messages");
        if (!messages) {
          throw new AppError('Something went wrong');
        }
    
        return messages;
      }
      async showmessage(id) {
        const message = await db.query("SELECT * FROM messages WHERE id = ?", id)
    
        if (message.length === 0) {
          throw new AppError('message does not exist');
        }
    
        return message;
      }
      async showMessage(message, id) {
        const checkIfmessageExists = await db.query("SELECT * FROM messages WHERE id = ?", id)
    
        if (checkIfmessageExists.length == 0) {
          throw new AppError('message does not exist');
        }
    
        let updatedmessages = await db.query("UPDATE messages SET name = ?,email = ?, message = ? WHERE id = ?",
        [message.name,message.email,message.message, id])
        
        updatedmessages = await db.query("SELECT * FROM messages WHERE id = ?", id)
        const updatedmessage = updatedmessages[0]
        return updatedmessage;
      }
      async updatemessage(message, id) {
        const checkIfmessageExists = await db.query("SELECT * FROM messages WHERE id = ?", [id])
    
        if (checkIfmessageExists.length == 0) {
          throw new AppError('message does not exist');
        }
       
        let updatedmessages = await db.query("UPDATE messages SET name = ?,email = ?,message = ? WHERE id = ?",
        [message.name,message.email,message.message, id])
        
        updatedmessages = await db.query("SELECT * FROM messages WHERE id = ?", [id])
        const updatedmessage = updatedmessages[0]
        
        return updatedmessage;
      }
      async Authenticatemessage(message){
        if (!message) {
            throw new AppError('message invalid!');
          }
    
          return { message: { name: message.name, id: message.id }, token };
      }
  }
  export {MessageServices}