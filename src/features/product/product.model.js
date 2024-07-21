import { User } from "../user/user.model.js";
export default class ProductModel{
    constructor(id, name, desc, price, imageUrl, category, sizes){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
    }
    
    static add(product){
      product.id = products.length + 1;
      products.push(product);
      return product;
    }
    static getOne(id){
      console.log(id)
      const product1 = products.find(e=>e.id==id);
      console.log(product1);
      return product1;
    }
    static filter(minPrice, maxPrice, category){
      const result = products.filter((product)=>{
        return(
        (!minPrice || 
          product.price >= minPrice) &&
        (!maxPrice || 
          product.price <= maxPrice) &&
        (!category || 
          product.category == category)
        );
      });
      return result;
    }

    //Rating part
    static rateproduct(userId,productID,rating){
      //Validate user
     
        const user=User.getAll().find(e=>e.id==userId);
        console.log(user)
        if(!user){
          //User defined error
          throw new ApplicationError("User not found",404);
        }

        //Validate product
       
        const product=products.find(e=>e.id==productID);
        if(!product){
          throw new ApplicationError("Product not found",400);
        }

        //Check have rating or not
        if(!product.ratings){
          product.ratings=[];
          
          product.ratings.push({
            userID:userId,
            rating:rating,
          });
         
        }
        
        //Check already have rating
        else{
          const ratingIndex=product.ratings.findIndex(e=>e.userID==userId);
          if(ratingIndex>=0){
            product.ratings[ratingIndex]={
              userID:userId,
              rating:rating,
            }
          }else{
            product.ratings.push({
              userID:userId,
              rating:rating,
            })
          }
        }
      
    }

    static GetAll(){
        return products;
    }
} 

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Category1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Category2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Category3',
      ['M', 'XL','S']
    )];