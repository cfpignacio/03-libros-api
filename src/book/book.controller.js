import {
	createBook,
	getBooks,
	getBook,
	updateBook,
	deleteBook
} from './book.service.js';

export const getBooksController = async (req, res) => {
	try {
		const books = await getBooks();
		res.json(books);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener libros' });
	}
};

export const getBookController = async (req, res) => {
	const id = parseInt(req.params.id);

	try {
		const book = await getBook(id);

		res.json(book);
	} catch (error) {
		console.log(`[ERROR] Al buscar el libro con id -> ${id}
				MENSAJE DE ERROR
				${error.message}
			`);
		res.status(500).json({ error: 'Error al obtener el libro' });
	}
};

export const createBookController = async (req, res) => {
	try {
		const book = await createBook(req.body, req.email);
		res.status(201).json(book);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error al crear libro' });
	}
};

export const updateBookController = async (req, res) => {
	const id = parseInt(req.params.id);
	const title = req.body.title;
	try {
		const bookUpdate = await updateBook(id, title);
		res.json(bookUpdate);
	} catch (error) {
		res.status(500).json({ error: 'Error al actulizar libro' });
	}
};

export const deleteBookController = async (req, res) => {
	const id = parseInt(req.params.id);
	try {
		const bookDelete = await deleteBook(id);
		res.json({ msg: 'Libro borrado correctamente!' });
	} catch (error) {
		res.status(500).json({ error: 'Error al borrar libro' });
	}
};
