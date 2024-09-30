import express from 'express';
import {
	createBookController,
	getBooksController,
	getBook,
	updateBook,
	deleteBook
} from './book.controller.js';
import { isAuthenticated } from '../middlewares/auth-middleware.js';

const router = express.Router();

router.get('/book', getBooksController);
router.post('/book', isAuthenticated, createBookController);
router.get('/book/:id', getBook);
router.patch('/book/:id', isAuthenticated, updateBook);
router.delete('/book/:id', isAuthenticated, deleteBook);

export default router;
