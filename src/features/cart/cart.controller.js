import Cart from "./cart.model.js";
import { User } from "../user/user.model.js";
import ProductModel from "../product/product.model.js";
export default class CartController{
    add(req,res){
        //access the user id from jwt token 
       const userId = req.userId; 
      const {productId,quantity} = req.query;  
      const validUser = User.getAll().find(e=>e.id==userId);
      const validProduct = ProductModel.GetAll().find(e=>e.id==productId);
      if(!validProduct){
         return res.status(201).send("Product not valid");
      }
      if(!validUser){
        return res.status(201).send("User not valid");
     }
      Cart.add(productId,userId,quantity);
      res.status(201).send("Cart is updated");
    }
    get(req,res){
        const userId=req.userId; 
       const cartItem = Cart.get(userId);
       return res.status(201).send(cartItem);
    }
    delete(req,res){
     const userId = req.userId;
     const cartItemId  = req.params.id;
     const error = Cart.delete(cartItemId,userId);
     if(error){
      res.status(401).send(error);
     }else{
       res.status(201).send("cart item is removed sucessfully");
     }


     
    }
}