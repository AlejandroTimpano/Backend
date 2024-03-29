import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { createResponse } from "../utils.js";
const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);
      if(!newUser) createResponse(res, 404, 'User already exists');
      else createResponse(res, 200, newUser);
    } catch (error) {
      next(error.message);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);
      res.header("Authorization", token);
      createResponse(res, 200, token);
    } catch (error) {
      next(error.message);
    }
  };

  profile = (req, res, next) => {
    try {
      const { first_name, last_name, email, role } = req.user;
      createResponse(res, 200, {
        first_name,
        last_name,
        email,
        role,
      });
    } catch (error) {
      next(error.message);
    }
  };

  async addProdToUserCart(req, res, next){
    try {
      const { _id } = req.user;
      const { idProd } = req.params;
      const { quantity } = req.params;
      const newProdToUserCart = await userService.addProdToUserCart(_id, idProd, Number(quantity));
      if(!newProdToUserCart) createResponse(res, 404, 'Error add product to user cart');
      createResponse(res, 200, newProdToUserCart);
    } catch (error) {
      next(error.message);
    }
  }
}
