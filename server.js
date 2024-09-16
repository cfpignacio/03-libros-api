import express from 'express';
import booksRoutes from './src/book/book.routes.js';
import authorsRoutes from './src/author/author.routes.js';
import usersRoutes from './src/user/user.routes.js';
import authRoutes from './src/auth/auth.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

// middleware METODO

// const printMetodo = (req, res, next) => {
// 	console.log(`MIDDLEWARE -> ${req.method}`);

// 	if (req.method == 'GET') {
// 		res.json('No soportamos GET');
// 	}

// 	next();
// };

app.get('/', (req, res) => {
	res.status(200).json('OK');
});

app.use('/api', booksRoutes);
app.use('/api', authorsRoutes);
app.use('/api', usersRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
	console.log(`Server funcionando en http://localhost:${port}`);
});
