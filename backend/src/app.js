const express = require("express");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});