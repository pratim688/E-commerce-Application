// 1. Import express
import express from 'express';
// import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
 import UserRouter from './src/features/user/user.routes.js';
 import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
 import jwtAuth from './src/middlewares/jwt.middleware.js';
import CartRouter from './src/features/cart/cart.routes.js';

import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type:'json'};

import loggerMiddleware from './src/middlewares/logger.middleware.js';
// 2. Create Server
const server = express();
server.use(express.json());//Otherwise req is not defined
// server.use(bodyParser.json());
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products

//basic auth 
//server.use("/api/products", basicAuthorizer,productRouter);

server.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

server.use(loggerMiddleware);

//JWT auth
server.use("/api/products", jwtAuth,productRouter);

server.use("/api/user", UserRouter);

server.use("/api/cart",jwtAuth,CartRouter);





// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

//Error handler middleware
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
   res.status(500).send("Smonething went wrong,please try again");
})
//Handling 404 bad request
 server.use((req,res)=>{
    res.status(404).send("Api not found");
 })

// 4. Specify port.
server.listen(3200,()=>{
    console.log("Server is running at 3200");
});

