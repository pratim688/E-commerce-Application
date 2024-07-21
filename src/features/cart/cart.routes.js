import express from "express";
import CartController from "./cart.controller.js";

const CartRouter=express.Router();
const cart=new CartController();
CartRouter.post('/',cart.add);
CartRouter.get('/',cart.get);
CartRouter.delete('/:id',cart.delete);

export default CartRouter;