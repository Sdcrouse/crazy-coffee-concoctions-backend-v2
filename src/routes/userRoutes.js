import express from 'express';

import { usernameValidations, passwordValidations } from '../middleware/validations/userValidations.js';
import { signup, login } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', usernameValidations(), passwordValidations(), signup);
router.post('/login', login);

// Next step: Logout route
// It's possible that I'll need to expire the token and save it to a blacklist (requiring another MySQL table)
// For faster login, see if using jwt asynchronously will help (i.e. the jwt.sign part)

export default router;