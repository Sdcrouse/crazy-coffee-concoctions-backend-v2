import express from 'express';

import { usernameValidations, passwordValidations } from '../middleware/validations/userValidations.js';
import { signup, login, refresh, logout, deleteProfile } from '../controllers/userController.js';
import { verifyRefreshToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', usernameValidations(), passwordValidations(), signup);
router.post('/login', login);
router.post('/refresh', verifyRefreshToken, refresh);
router.post('/logout', verifyRefreshToken, logout);
router.delete('/delete-profile', verifyRefreshToken, deleteProfile);

export default router;