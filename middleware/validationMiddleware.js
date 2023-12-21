import { body, param, validationResult } from 'express-validator'
import mongoose from 'mongoose';
import User from '../models/UserModel.js'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customError.js'


const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg)
                if (errorMessages[0].startsWith('no job')) {
                    throw new NotFoundError(errorMessages)
                }
                if (errorMessages[0].startsWith('not authorized')) {
                    throw new UnauthorizedError('not authorized to access this route')
                }
                throw new BadRequestError(errorMessages)
            }
            next()
        },
    ];
};

export const validateRegisterInput = withValidationErrors([
    body('firstName').notEmpty().withMessage('first name is required').isLength({ max: 15 }).withMessage('first name can be 15 characters max'),
    body('username').notEmpty().withMessage('username is required').isLength({ max: 7 }).withMessage('username can be 7 characters max')
        .custom(async (username) => {
            const user = await User.findOne({ username: username })
            if (user) {
                throw new BadRequestError('username already exists')
            }
        }),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email })
            if (user) {
                throw new BadRequestError('email already exists')
            }
        }),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be atleast 8 characters long').isLength({ max: 50 }).withMessage('password can be 50 characters max'),
    body('location').notEmpty().withMessage('location is required').isLength({ max: 23 }).withMessage('location can be 23 characters max'),
    body('lastName').notEmpty().withMessage('last name is required').isLength({ max: 23 }).withMessage('last name can be 23 characters max')
]);

export const validateEditUserInput = withValidationErrors([
    body('firstName').notEmpty().withMessage('first name is required').isLength({ max: 15 }).withMessage('first name can be 15 characters max'),
    body('location').notEmpty().withMessage('location is required').isLength({ max: 23 }).withMessage('location can be 23 characters max'),
    body('lastName').notEmpty().withMessage('last name is required').isLength({ max: 23 }).withMessage('last name can be 23 characters max')
]);