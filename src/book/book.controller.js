import prisma from './../../prisma/prismaClient.js';

export const getBooks = async (req, res) => {
	try {
		const books = await prisma.book.findMany();
		res.json(books);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener libros' });
	}
};

// BUSCAR LIBRO POR ID

// export const getBook = async (req, res) => {
// 	// try {
// 	// 	const idBook = req. ?
// 		const book = await prisma.book.findUnique()
// 		res.json(books);
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error al obtener libros' });
// 	}
// };

export const createBook = async (req, res) => {
	try {
		const { title, year, publisher } = req.body;

		// const title = req.body.title;
		// const year = req.body.year;
		// const publisher = req.body.publisher;

		const book = await prisma.book.create({
			data: {
				title,
				year,
				publisher
			}
		});

		res.status(201).json(book);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error al crear libro' });
	}
};
