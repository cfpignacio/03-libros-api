import prisma from '../../prisma/prismaClient.js';

export const getAuthors = async () => {
	const author = await prisma.author.findMany();
	return author;
};

export const getAuthor = async (id) => {
	const author = await prisma.author.findUniqueOrThrow({ where: { id } });
	return author;
};

export const createAuthor = async (author) => {
	const { firstName, lastName, nationality, birthdate, numero } = author;
	// const numero = BigInt(author.numero);
	// console.log(BigInt(author.numero));
	const author_Create = await prisma.author.create({
		data: {
			firstName,
			lastName,
			nationality,
			birthdate: new Date(birthdate),
			numero: BigInt(numero)
		}
	});
	const result = { ...author_Create, numero: numero.toString() };
	return result;
};

export const updateAuthor = async (id, author) => {
	const { firstName, lastName, nationality, birthdate } = author;
	const authorUpdate = await prisma.author.update({
		where: { id },
		data: {
			...(firstName && { firstName }),
			...(lastName && { lastName }),
			...(nationality && { nationality }),
			...(dateOfBirth && { dateOfBirth: new Date(birthdate) })
		}
	});
	return authorUpdate;
};
export const deleteAuthor = async (id) => {
	const authorDelete = await prisma.author.delete({ where: { id } });
	return authorDelete;
};
