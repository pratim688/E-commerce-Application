//productId,Userid,quantity
export default class Cart{
   constructor(productId,userId,quantity,id){
      this.productId=productId;
      this.userId=userId;
      this.quantity=quantity;
      this.id=id;
   }

   static add(productId,UserId,quantity){
    const sameProduct = cartItems.find(e=>e.productId==productId);
    console.log(sameProduct)
    if(sameProduct){
      sameProduct.quantity=quantity;
      
    }else{
    let id=cartItems.length+1;
     const cartItem=new Cart(productId,UserId,quantity,id);
     cartItems.push(cartItem);
       }
    }

   static get(userId){
    console.log(cartItems);
    const cartItem=cartItems.filter(e=>e.userId==userId);
    return cartItem;

   }

   static delete(cartId,userId){
      const cartItemIndex = cartItems.findIndex(e=>e.id==cartId && e.userId==userId);
      if(cartItemIndex== -1){
         return "Item not found";
      }else{
         cartItems.splice(cartItemIndex,1);
      }
   }

}
var cartItems=[new Cart(1,2,1,1)];