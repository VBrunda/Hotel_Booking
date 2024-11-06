import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import User, { IUser } from "../model/user-model";
import { AuthService } from "../services/auth-services";
import { createSuccess } from "../utils/successResponse";

export const registerUser = async (req: Request, res: Response, next: any) => {
    const { id, userName, email, password, role } = req.body;
    let hashedPswd;
    try {
        if(password){
            hashedPswd = await AuthService.encryptPassword(password); // Await for the hashed password
        }
        
        if (!id) {
            const user: IUser = await User.create({
                userName,
                email,
                password: hashedPswd,
                role
            });
            const { password: _, ...userWithoutPassword } = user.toObject();
            return next(createSuccess(200, "User Registered Successfully", userWithoutPassword));
        } else {
            const user: IUser | null = await User.findByIdAndUpdate(id, { $set: req.body });
            return next(createSuccess(200, "User Updated Successfully", {userName, email, role}));
        }
    } catch (error: any) {
        return next(new ErrorResponse(error.message, 500));
    }
};

export const login = async (req: Request, res: Response, next: any) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide a valid email and password", 400));
    }
    try {
        const existingUser: IUser = await User.findOne({ email }).select("+password");
        
        if (!existingUser) return next(new ErrorResponse("Invalid Credentials", 400));
        const isMatch: boolean = await AuthService.matchPassword(password, existingUser.password);
        
        if (!isMatch) return next(new ErrorResponse("Invalid Credentials", 401));

        const { password: _, ...userWithoutPassword } = existingUser.toObject();
        return next(createSuccess(200, "Login Successfully", userWithoutPassword));

    } catch (error: any) {
        return next(new ErrorResponse(error.message, 500))
    }
}

export const allUsers = async (req:Request, res:Response, next:any) => {
 try {
    const users = await User.find();
    if(users.length  > 0) {
        return next(createSuccess(200, "Users Found", users));
    }
    return next(createSuccess(200, "Users Not Found", []));
 } catch (error:any) {
    return next(new ErrorResponse(error.message, 500))
 }
}

export const addUpdateUser = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const user:IUser = req.body;
        if(user.userId === 0){            
            const maxId = await User.findOne({}, {userId:1}).sort({userId:-1});
            const newId = maxId ? maxId.userId + 1 : 23560;
            user.userId = newId;
            await User.create(user);
        }else{
           await User.findOneAndUpdate({userId: user.userId},
                {$set: user},
                {new: true, runValidators: true});
        }
        return next(createSuccess(200, 'User created/updated successfully', user))
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 500));
    }
}

export const removeUser = async (req:Request, res:Response, next:any) => {
    try {
        const id = req.query.id;
        const user = await User.findOneAndDelete({userId: id});
        if(!user) return next(new ErrorResponse("User Not found", 400));
        return next(createSuccess(200, "User Deleted Successfully", user.userName));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 500))
    }
}