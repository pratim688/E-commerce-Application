import { User } from "./user.model.js";
import jwt from "jsonwebtoken";
export default class UserController {
  signUp(req, res) {
    const { name, email, password, TypeOfUser } = req.body;
    const newUser = User.signUp(name, email, password, TypeOfUser);
    res.status(201).send(newUser);
  }
  signIn(req, res) {
    const { email, password } = req.body;
    const result = User.signIn(email, password);
    if (!result) {
      return res.status(400).send("Incorract Credentials");
    } else {
      //Here we can use jwt tokens,1st import
      //1.Create token,1st have payload(user credentials expect password),2nd key genarator(online key genarator)
      const token = jwt.sign({ userId: result.id, email: result.email }, "KYRE#1u0cx5BeYj", { expiresIn: '1h' })
      //2.Send token
      
      
      return res.status(200).send(token);
    }


  }
}