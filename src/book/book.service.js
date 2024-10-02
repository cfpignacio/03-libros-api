import prisma from '../../prisma/prismaClient.js';
import { getUserByEmail } from '../user/user.service.js';

export const createBook = async (book, email) => {
	const { title, year, publisher, authorId } = book;
	const user = await getUserByEmail(email);
	const create_book = await prisma.book.create({
		data: {
			title,
			year,
			publisher,
			authorId,
			userId: user.id
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
		include: {
			author: { select: { firstName: true, lastName: true } },
			user: { select: { email: true } }
		}
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
