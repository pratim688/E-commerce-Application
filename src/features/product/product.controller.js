import ProductModel from "./product.model.js";

export default class ProductController{

    getAllProducts(req,res){
        const products = ProductModel.GetAll();
        res.status(200).send(products);
    }

    addProduct(req, res){
        const {name, price, sizes} = req.body;
        const newProduct = {
            name,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imageUrl: req.file.filename,
        };
        const createdRecord=ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }

    rateProduct(req,res){
        console.log("Hi");
        console.log(req.query);
       const userId=req.query.userId;
       const ProductId=req.query.ProductId;
       const rating=req.query.rating;
       try{
        ProductModel.rateproduct(userId,ProductId,rating);
       }catch(err){
        return res.status(400).send(err.message);
       }  
          return res.status(200).send("Rate product sucessfully");    
     }

    getOneProduct(req,res){
        const id = req.params.id;
        console.log(id)
        const product = ProductModel.getOne(id);
        
        if(!product){
            res.status(404).send("product not found");
        }else{
             return res.status(200).send(product);
        }
    }
    filterProducts(req, res) {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = ProductModel.filter(
            minPrice,
            maxPrice,
            category
        );
        res.status(200).send(result);
    }

}