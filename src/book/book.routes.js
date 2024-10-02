import express from 'express';
import {
	createBookController,
	getBooksController,
	updateBookController,
	deleteBookController,
	getBookController
} from './book.controller.js';
import { isAuthenticated } from '../middlewares/auth-middleware.js';

const router = express.Router();

// PUBLIC
router.get('/book', getBooksController);
router.get('/book/:id', getBookController);

// AUTH
router.post('/book', isAuthenticated, createBookController);
router.patch('/book/:id', isAuthenticated, updateBookController);
router.delete('/book/:id', isAuthenticated, deleteBookController);

export default router;
