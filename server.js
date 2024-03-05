import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import uploadRoutes from './routes/uploadRoutes.js';
import cors from "cors";
import morgan from 'morgan';


const app = express();
if (process.env.NODE_ENV === 'DEVELOPEMENT') {
    app.use(morgan('dev'));
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
connectDB();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use("/api/upload", uploadRoutes);


app.get('/', (req, res) => {
    res.send('Api is running....');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode and listening on Port:${port}`.yellow.bold.underline);
});