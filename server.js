import 'dotenv/config';
import express from 'express';
import booksRoutes from './src/book/book.routes.js';
import authorsRoutes from './src/author/author.routes.js';
import usersRoutes from './src/user/user.routes.js';
import authRoutes from './src/auth/auth.routes.js';
import { createBook, getBooks } from './src/book/book.service.js';

const app = express();
const port = parseInt(process.env.APIBOOK_PORT) || 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).json('api books ver 0.0.1 📖');
});

app.use('/api', booksRoutes);
app.use('/api', authorsRoutes);
app.use('/api', usersRoutes);
app.use('/api', authRoutes);

const total_de_libros = await getBooks();

console.log(`TOTAL LIBROS : ${total_de_libros.length}`);
app.listen(port, () => {
	console.log(`Server funcionando en http://localhost:${port}`);
});
