import express from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';
import sessionRoutes from './routes/sessionRoutes';
import championshipRoutes from './routes/championshipRoutes';
import mysql from 'mysql2';
import 'dotenv/config';

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
app.use('/championship', championshipRoutes);

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
