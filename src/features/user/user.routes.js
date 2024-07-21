import express from 'express';
import UserController from './user.controller.js';
const UserRouter=express.Router();
const UserController1=new UserController();
UserRouter.post('/signup',UserController1.signUp);
UserRouter.post('/signin',UserController1.signIn);
export default UserRouter;

