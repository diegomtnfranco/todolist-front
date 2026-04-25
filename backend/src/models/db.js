const sql = require("mssql");

const config = {
    user: "kanbanUser",
    password: "123456",
    server: "localhost",
    port: 51903,
    database: "kanbanDB",
    options: {
        trustServerCertificate: true
    }
};

async function getConnection() {
    return await sql.connect(config);
}

module.exports = { sql, getConnection };