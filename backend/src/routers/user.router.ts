import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();


router.get('/seed', asyncHandler(
    async (req, res) => {
        const userCount = await UserModel.countDocuments();
        if (userCount > 0) {
            res.send("User seed is already done !");
            return;
        }

        await UserModel.create(sample_users);
        res.send("user seed is done");
    }
));

router.post('/login', asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenRespone(user));
        }
        else {
            res.status(HTTP_BAD_REQUEST).send("User not found !!!");
        }
    }
));


router.post('/register', asyncHandler(
    async (req, res) => {
        const { email, name, address, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(HTTP_BAD_REQUEST).send("User already exsist !!!");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            name,
            password: encryptedPassword,
            id: '',
            email: email.toLowerCase(),
            address,
            isAdmin: false
        };

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenRespone(dbUser));
    }
));


const generateTokenRespone = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, 'someRandomText', {
        expiresIn: '30d'
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;