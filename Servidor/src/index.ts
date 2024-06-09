require('dotenv').config();
const mysql = require('mysql');
import cors from 'cors';

const sessionRoutes = require('./routes/sessionRoutes');
const gameRoutes = require('./routes/gameRoutes');

const express = require('express');
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE",
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/session', sessionRoutes);
app.use('/game', gameRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export const connection = mysql.createConnection({
  host: 'localhost',
  database: process.env.NAME,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASS
});

connection.connect((err: any) => {
  if (err) throw err;
  console.log('Conectado a la base de datos.');
});