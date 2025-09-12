import express from 'express';

import { getConcoctions, getConcoction, createNewConcoction, deleteUserConcoction } from '../controllers/concoctionController.js';

const router = express.Router();

router.get('/', getConcoctions);
router.get('/:id', getConcoction);
router.post('/', createNewConcoction);
router.delete('/:id', deleteUserConcoction);

export default router;