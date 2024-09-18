import express from 'express';
import {
	createBookController,
	getBooksController,
	getBook,
	updateBook,
	deleteBook
} from './book.controller.js';

const router = express.Router();

router.get('/book', getBooksController);
router.post('/book', createBookController);
router.get('/book/:id', getBook);
router.patch('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

export default router;
