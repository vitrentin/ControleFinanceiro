const db = require('../databases/db')
class CategoriesServices{
    async createCategory(category) {
        let newCategory = await db.query("INSERT INTO categories(name,user_id)VALUES(?,?)",[category.name,category.userId]);
        newCategory =  await db.query("SELECT name FROM categories WHERE user_id = ? ORDER BY id DESC LIMIT 1 ",[category.userId])
        newCategory = newCategory[0]
        
        return newCategory;
      }

      async deletedCategory(id) {
        const checkIfCategoryExists = await db.query("SELECT * FROM categories WHERE id = ?",[id]);
    
        if (checkIfCategoryExists.length === 0) {
          throw new AppError('Category does not exist');
        }
    
        let deletedCategory =  await db.query("DELETE FROM categories WHERE id = ?",[id])
    
        deletedCategory = await db.query("SELECT * FROM categories WHERE id = ?",[id]);
    
        return deletedCategory;
      }
      async updatedCategory(category, id) {
        const checkIfCategoryExists =  await db.query("SELECT * FROM categories WHERE id = ?",[id])
    
        if (checkIfCategoryExists.length === 0) {
          throw new AppError('Category does not exist');
        }
       
        let updatedCategory =  await db.query("UPDATE categories SET name = ? WHERE id = ?",[category.name, id])

        updatedCategory = await db.query("SELECT * FROM categories WHERE id = ?",[id])
        updatedCategory = updatedCategory[0]
    
        return updatedCategory;
      }
      async showCategories(userId) {
        const categories =  await db.query("SELECT * FROM categories WHERE user_id = ?", userId);
        return categories;
      }
      async showCategory(id) {
        const category = await db.query("SELECT * FROM categories WHERE id = ?", id)
    
        if (category.length === 0) {
          throw new AppError('Category does not exist');
        }
    
        return category;
      }

}

export {CategoriesServices}