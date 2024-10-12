import { ReturnDocument } from "mongodb";

const userService = require("../service/user-service");
class UserController {
  async regisration(req: any, res: any) {
    try {
      const { name, password, email } = req.body;
      console.log(req.body, "body");

      // console.log(name);

      const userData = await userService.regisration(name, password, email);
      if (userData.ok) {
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
      }
      return res.json(userData);
    } catch (e) {
      console.log(e);
      res.json({ message: "Такой пользователь уже есть", err: e })
    }
  }
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      if (userData.ok) {
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
      }

      return res.json(userData);

    } catch (e) {
      console.log(e);
    }
  }
  // async logout(req, res, next) {
  //     try {


  //     } catch (e) {
  //         console.log(e);
  //     }
  // }
  async refresh(req: any, res: any) {
    try {
      const { refreshToken } = req.cookies
      console.log(4);

      const tokens = await userService.refresh(refreshToken)

      console.log(tokens, "50");
        if (tokens.refreshToken) {
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
        }

      // console.log(tokens);
      return res.json(tokens)
    } catch (e) {
      console.log(e);
    }
  }

  async validToken(req: any, res: any) {
    const { accessToken } = req.body
    const { refreshToken } = req.cookies
    console.log(accessToken, "axdsdsd");

    const validToken = await userService.validToken(accessToken, refreshToken)
    console.log(validToken, "validToken");

    return res.json(validToken)
  }


  async basket(req: any, res: any) {
    const { id, text, price, image } = req.body
    const { refreshToken } = req.cookies
    const addBasket = await userService.addBasket(id, text, price, image, refreshToken)
    return res.json(addBasket)
  }
  async getBasket(req: any, res: any) {
    const { refreshToken } = req.cookies
    const addBasket = await userService.getBasket(refreshToken)
    return res.json(addBasket)
  }
  async search(req: any, res: any) {
    const { value } = req.body
    console.log(value);

    const searchCart = await userService.searchCart(value)
    return res.json(searchCart)
  }

  async getProducts(req: any, res: any) {
    const getProducts = await userService.getProducts()

    return res.json(getProducts)
  }


  async logout(req: any , res: any ) {
    try {
      const {refreshToken} = req.cookies
      console.log(req.cookies);
      const tokens = await userService.logout(refreshToken)
      res.clearCookie("refreshToken")
      return res.json(tokens)
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserController();
