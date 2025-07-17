import { body } from 'express-validator';

const usernameValidations = () => body('username')
    .trim().notEmpty().withMessage('Username is required.').bail()
    .isLength({ min: 8 }).withMessage('Username must be at least eight characters long.')
    .matches(/^[\w\.]+$/).withMessage('Username should only contain letters, numbers, periods, and underscores.')
    .matches(/^[a-zA-Z].*[a-zA-Z\d]$/).withMessage('Username must start with a letter and end with a letter or number.');

const passwordValidations = () => body('password')
    .trim().notEmpty().withMessage('Password is required.').bail()
    .isStrongPassword().withMessage(
        'Password is not strong enough. It must be at least 8 characters long and contain one of each of the following: lowercase letters, uppercase letters, numbers, and special characters.'
    )
    .custom((passValue, { req }) => !passValue.includes(req.body.username) && !passValue.toLowerCase().includes('password'))
        .withMessage("Password must not contain the username or the word 'password'.");

export { usernameValidations, passwordValidations };