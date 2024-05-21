import mysql from "mysql2/promise";
require('dotenv').config();

const express = require('express');
const app = express();
import cors from 'cors';

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE",
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Conexión con la base de datos
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.NAME
})

async function queryDatabase() {
    const result = await pool.query("SELECT * FROM Usuario");
    console.log(result);
}

queryDatabase();