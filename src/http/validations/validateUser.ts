import { body } from 'express-validator';

// Validation middleware function
export const validateUser = [
	body('firstName').notEmpty().withMessage('First name is required'),
	body('lastName').notEmpty().withMessage('Last name is required'),
	body('phoneNumber').notEmpty().withMessage('Phone number is required'),
	body('email').notEmpty().withMessage('Email is required').isEmail()
		.withMessage('Invalid email format'),
	body('password').notEmpty().withMessage('Password is required').isStrongPassword()
		.withMessage('Password must contain lowercase, uppercase, number, symbol, and be at least 8 characters long'),
	body('dateOfBirth').notEmpty().withMessage('Date of birth is required').isISO8601()
		.withMessage('Invalid date format'),
];
