import express from 'express';

import { getConcoctions, getConcoction, createNewConcoction } from '../controllers/concoctionController.js';

const router = express.Router();

router.get('/', getConcoctions);
router.get('/:id', getConcoction);
router.post('/', createNewConcoction);

export default router;