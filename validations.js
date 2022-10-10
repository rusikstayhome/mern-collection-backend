import { body } from 'express-validator';

export const loginValidation = [
    body('username', 'Invalid username'),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Invalid mail format'),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('username', 'Укажите имя').isLength({ min: 3 }),
    // body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const collectionCreateValidation = [
    body('title', 'Enter a title for the collection').isLength({ min: 3 }).isString(),
    body('description', 'Enter a description for the collection').isLength({ min: 3 }).isString(),
    body('tags', 'Wrong tag format').optional().isString(),
    body('imageUrl', 'Invalid image link').optional().isString(),
];

