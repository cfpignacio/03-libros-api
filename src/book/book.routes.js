import express from 'express';
import { createBook, getBooks } from './book.controller.js';

const router = express.Router();

router.get('/book', getBooks);
// router.get('/book/:id', getBook);
router.post('/book', createBook);

export default router;
