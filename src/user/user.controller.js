import prisma from '../../prisma/prismaClient.js';
import bcrypt from 'bcryptjs';
import { createBook } from '../book/book.service.js';

export const createUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const passwordBcrypt = await bcrypt.hash(password, 10);

		const user = await prisma.users.create({
			data: {
				firstName,
				lastName,
				email: email.toLowerCase(),
				password: passwordBcrypt
			}
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ msg: 'Error al crear el usuario' });
	}
};

export const getUsers = async (req, res) => {
	try {
		const users = await prisma.users.findMany({
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true
			},
			where: { deletedAt: null }
		});
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error al obtener los usuarios registrados' });
	}
};

export const getUser = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const user = await prisma.users.findUnique({
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				deletedAt: true,
				updateAt: true,
				createAt: true
			},
			where: { id, deletedAt: null }
		});
		if (!user) {
			return res
				.status(404)
				.json({ msg: 'No se encontro al usuario ingresado' });
		}

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json('Error al buscar el usuario');
	}
};

export const updateUser = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (!existUser(id)) {
			return res.status(404).json({ msg: 'Usuario no encontrado' });
		}

		const { firstName, lastName, password } = req.body;
		const user = await prisma.users.update({
			where: { id },
			data: {
				...(firstName && { firstName: firstName.toLowerCase() }),
				...(lastName && { lastName: lastName.toLowerCase() }),
				...(password && { password })
			}
		});
		if (!user) {
			return res.status(404).json({ msg: 'Usuario no encontrado' });
		}
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error al actualizar el usuario' });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const userCheck = existUser(id);

		if (!userCheck) {
			return res.status(404).json({ msg: 'Usuario no encontrado' });
		}
		const user = await prisma.users.update({
			where: { id },
			data: { deletedAt: new Date() }
		});

		res.status(200).json({ msg: 'Usuario eliminado con éxito' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error al eliminar el usuario' });
	}
};

export const existUser = async (id) => {
	try {
		const exitsUser = await prisma.users.findUnique({
			where: { id, deletedAt: null }
		});

		if (!exitsUser) {
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
};
