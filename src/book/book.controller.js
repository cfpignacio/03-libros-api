import prisma from './../../prisma/prismaClient.js';
import { createBook, getBooks } from './book.service.js';

export const getBooksController = async (req, res) => {
	try {
		const books = await getBooks();

		res.json(books);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener libros' });
	}
};

export const getBook = async (req, res) => {
	const id = parseInt(req.params.id);

	try {
		const book = await prisma.book.findUniqueOrThrow({
			where: { id },
			include: { author: { select: { firstname: true, lastname: true } } }
		});

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

export const updateBook = async (req, res) => {
	const id = parseInt(req.params.id);
	const title = req.body.title;
	try {
		const bookUpdate = await prisma.book.update({
			where: { id },
			data: { title }
		});
		if (!bookUpdate) {
			throw new Error();
		}
		res.json(bookUpdate);
	} catch (error) {
		res.status(500).json({ error: 'Error al actulizar libro' });
	}
};

export const deleteBook = async (req, res) => {
	const id = parseInt(req.params.id);
	try {
		const bookDelete = await prisma.book.delete({ where: { id } });
		res.json({ msg: 'Libro borrado correctamente!' });
	} catch (error) {
		res.status(500).json({ error: 'Error al borrar libro' });
	}
};
