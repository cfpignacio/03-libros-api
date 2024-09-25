import { authLocal } from './auth.service.js';

export const loginLocalUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const token_jwt = await authLocal(email, password);
		res.status(200).json({ token_jwt });
	} catch (error) {
		res.status(500).json({ msg: 'Login false' });
	}
};
