const { getConnection, sql } = require("../models/db");

exports.getTasks = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Tasks");
    res.json(result.recordset);
};

exports.createTask = async (req, res) => {
    const { title, status } = req.body;

    if (!title) {
        return res.status(400).json({ error: "El título es obligatorio" });
    }

    const pool = await getConnection();
    await pool.request()
        .input("title", sql.VarChar, title)
        .input("status", sql.VarChar, status)
        .query("INSERT INTO Tasks (title, status) VALUES (@title, @status)");

    res.json({ message: "Tarea creada" });
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    try {
        const pool = await getConnection();

        await pool.request()
            .input("id", sql.Int, id)
            .input("title", sql.VarChar, title || "")
            .input("status", sql.VarChar, status || "")
            .query(`
                UPDATE Tasks 
                SET 
                    title = COALESCE(@title, title),
                    status = COALESCE(@status, status)
                WHERE id = @id
            `);

        res.json({ message: "Tarea actualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();
    await pool.request()
        .input("id", sql.Int, id)
        .query("DELETE FROM Tasks WHERE id=@id");

    res.json({ message: "Tarea eliminada" });
};