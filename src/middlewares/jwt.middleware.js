import jwt from 'jsonwebtoken';

const jwtAuth  = (req,res,next)=>{
    //1.Read the token.
    console.log(req.headers);
    const token = req.headers['authorization'];
    //2.if no token then return error
    if(!token){
      return res.status(401).send("Unauthorize");

    }

    //3.check if token is valid
    try{
       const payload = jwt.verify(token,"KYRE#1u0cx5BeYj");
       req.userId=payload.userId;
       console.log(payload);
    }
    catch(err){
        return res.status(401).send("Unauthorize");
    }
    

    //4.call next
    next();
}
export default jwtAuth;