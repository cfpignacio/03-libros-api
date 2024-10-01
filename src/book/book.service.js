import prisma from '../../prisma/prismaClient.js';

export const createBook = async (book, email) => {
	const { title, year, publisher, authorId } = book;
	console.log(`este dato viene desde el jwt -> ${email}`);
	const create_book = await prisma.book.create({
		data: {
			title,
			year,
			publisher,
			authorId
		}
	});

	return create_book;
};

export const getBooks = async () => {
	const books = await prisma.book.findMany();
	return books;
};

export const getBook = async (id) => {
	const book = await prisma.book.findUniqueOrThrow({
		where: { id },
		include: { author: { select: { firstname: true, lastname: true } } }
	});

	return book;
};

export const updateBook = async (id, title) => {
	const bookUpdate = await prisma.book.update({
		where: { id },
		data: { title }
	});

	if (!bookUpdate) {
		throw new Error();
	}
	return bookUpdate;
};

export const deleteBook = async (id) => {
	const bookDelete = await prisma.book.delete({ where: { id } });
	return bookDelete;
};
