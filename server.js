import express from 'express';
import librosRoutes from './src/book/book.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).json('OK');
});

app.use('/api', librosRoutes);

app.listen(port, () => {
	console.log(`Server funcionando en http://localhost:${port}`);
});
