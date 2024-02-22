import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
connectDB();



app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('Api is running...')
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode and listening on Port:${port}`.yellow.bold.underline);
});