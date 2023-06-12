import { Schema, model } from "mongoose";

export interface User {
    email:string;
    id:string;
    name:string;
    password:string
    address:string;
    token:string;
    isAdmin:boolean;
}

export const UserSchema = new Schema<User>(
    {
        email : {type:String,required:true,unique:true},
        name : {type:String,required:true},
        password : {type:String,required:true},
        address : {type:String,required:true},
        isAdmin : {type:Boolean,required:true},
    },
    {
        timestamps:true,
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        }
    }
);

export const UserModel = model<User>('users',UserSchema);