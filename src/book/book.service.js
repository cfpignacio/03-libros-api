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
