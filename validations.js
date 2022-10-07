import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Invalid mail format'),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Invalid mail format'),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('username', 'Укажите имя').isLength({ min: 3 }),
    // body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текс статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов(укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

