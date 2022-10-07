import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import UserModel from '../models/User.js';
import RoleModel from '../models/Role.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).jsin(errors.array())
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const userRole = await RoleModel.findOne({ value: 'user' })

        const doc = new UserModel({
            email: req.body.email,
            username: req.body.username,
            passwordHash: hash,
            roles: [userRole.value]
        })

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
            roles: user.roles.map(role => role)
        },
            'ilovenika',
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to register'
        })
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username })

        if (!user) {
            return res.status(404).json({
                message: 'Wrong login or password'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Wrong login or password'
            })
        }

        const token = jwt.sign({
            _id: user._id,
            roles: user.roles.map(role => role)
        },
            'ilovenika',
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to login'
        })
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const { passwordHash, ...userData } = user._doc;

        res.json({
            userData
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'No access'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const users = await UserModel.find()

        res.json(users);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get list of users'
        })
    }
}

export const update = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId)

        await UserModel.updateOne({
            _id: userId,
        }, {
            roles: req.body.roles
        })

        const token = jwt.sign({
            _id: user._id,
            roles: user.roles.map(role => role)
        },
            'ilovenika',
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}

