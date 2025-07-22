import express from 'express';

import { usernameValidations, passwordValidations } from '../middleware/validations/userValidations.js';
import { signup, login } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', usernameValidations(), passwordValidations(), signup);
router.post('/login', login);

// Next step: Logout route or refresh token (should resend a token to the backend when the user refreshes the page)
// It's possible that I'll need to expire the token and save it to a blacklist (requiring another MySQL table)

export default router;