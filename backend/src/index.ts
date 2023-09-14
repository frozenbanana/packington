import express from 'express';
import routes from './routes';
import connectDB from './db';

const app = express();

connectDB();

app.use(express.json()); // for parsing application/json
app.use('/api', routes); // Prefix all routes with /api

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello from the Packing List API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
