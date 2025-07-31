import express from 'express';

import { getConcoctions, getConcoction } from '../controllers/concoctionController.js';

const router = express.Router();

router.get('/', getConcoctions);
router.get('/:id', getConcoction);

export default router;