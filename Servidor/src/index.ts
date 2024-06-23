import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import 'dotenv/config';

import sessionRoutes from './routes/sessionRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

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
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export const connection = mysql.createConnection({
    host: 'localhost',
    database: process.env.NAME,
    port: parseInt(process.env.PORT || '3306', 10),
    user: process.env.USER,
    password: process.env.PASS
});

connection.connect((err: any) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

const { pointsRemainder } = require('./mail');

const intervaloDias = 24 * 60 * 60 * 1000;
setInterval(pointsRemainder, intervaloDias);