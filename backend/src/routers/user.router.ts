import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

const router = Router();


router.get('/seed', asyncHandler(
    async (req,res) =>  {
        const userCount = await UserModel.countDocuments();
        if(userCount>0){
            res.send("User seed is already done !");
            return;
        }

        await UserModel.create(sample_users);
        res.send("user seed is done");
    }
));

router.post('/login',asyncHandler(
    async (req,res) =>{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email,password});
        if(user){
            res.send(generateTokenRespone(user));
        }
        else {
            res.status(400).send("User not found !!!");
        }
    }
));

const generateTokenRespone = (user:any) => {
    const token = jwt.sign({
        email:user.email , isAdmin:user.isAdmin
    }, 'someRandomText',{
        expiresIn:'30d'
    });

    user.token = token;
    return user;
}

export default router;