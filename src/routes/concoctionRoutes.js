import express from 'express';

import { getConcoctions } from '../controllers/concoctionController.js';

const router = express.Router();

router.get('/', getConcoctions);

export default router;