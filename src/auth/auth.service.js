import prisma from '../../prisma/prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authLocal = async (email, password) => {
	// comprobamos si el usuario existe
	const user = await prisma.users.findUniqueOrThrow({
		where: {
			email,
			deletedAt: null
		}
	});
	// validamos el password
	const passwordCheck = await bcrypt.compare(password, user.password);
	if (!passwordCheck) {
		throw new Error();
	}
	// generamos JWT
	// npm install jsonwebtoken
	const accessToken = jwt.sign({ email: user.email }, 'mipassword01', {
		expiresIn: '1h'
	});
	return accessToken;
};
