const mysql = require('mysql2/promise');

async function getConnection() {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        //password: '123321',
        password: 'admin',

        database: 'ControleFinanceiro2'
    });
    return connection;
}

async function query(sql = '', values = [])
{
    const conn = await getConnection();
    const result = await conn.query(sql, values);
    conn.end();
    return result[0];
}

// CommonJS
module.exports = { query }