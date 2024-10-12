import { log } from "console";

const UserModel = require("../models/user-model.js");
const tokenModels = require("../models/token-model");
const basketModel = require("../models/basket-model")
const productsModel = require("../models/products-model")


const bcrypt = require("bcrypt");
const UserDto = require("../dtos/User.dto");
const tokenService = require("./token-service");


class UserService {
    async regisration(name: any, password: any, email: any) {
        try {
            const candidate = await UserModel.findOne({ email: email });
            console.log(candidate);

            if (candidate) {
                console.log(`Пользователь с таким email ${email} уже есть`);
                return { message: `Пользователь с таким email ${email} уже есть`, ok: false };
            }

            const hashPassword = await bcrypt.hash(password, 6);
            const user = await UserModel.create({ name: name, password: hashPassword, email: email });
            console.log(user, "user");

            const userDto = new UserDto(user);
            const generationToken = tokenService.generationToken({ ...userDto });

            await tokenService.saveToken(userDto.id, generationToken.refreshToken);
            return { ...generationToken, user: userDto,  ok: true };
        } catch (error) {
            console.error("Ошибка при регистрации пользователя:", error);
            return { message: "Ошибка при регистрации. Попробуйте снова.", ok: false };
        }
    }
    async login(email: any, password: any) {
        const chackUsers = await UserModel.findOne({ email: email });
        if (!chackUsers) {
            console.log("Такого пользователя нет");
            return { message: "Такого пользователя нет", ok: false }
        }

        const chackPassword = await bcrypt.compare(password, chackUsers.password);
        if (!chackPassword) {
            console.log("Некоректный пароль");
            return { message: "Некоректный пароль", ok: false }
        }
        const userDto = new UserDto(chackUsers);

        const generationToken = tokenService.generationToken({ ...userDto });
        console.log(generationToken);
        await tokenService.saveToken(userDto.id, generationToken.refreshToken);
        return { ...generationToken, user: userDto , ok: true};


    }

    async refresh(refreshToken: any) {
        if (!refreshToken) {
            return { message: "Такого токена нет" };
        }

        const tokenValid = await tokenService.checkRefreshToken(refreshToken);
        if (tokenValid === undefined) {
            return { message: "refreshToken невалиден" };
        }
    console.log(refreshToken, 67);

    const findToken = await tokenService.findToken(refreshToken);
    if (findToken) {
        const user = await UserModel.findById(findToken.user);
        const userDto = new UserDto(user);
        const generationToken = tokenService.generationToken({ ...userDto });
        
        await tokenService.saveToken(userDto.id, generationToken.refreshToken);
        return { ...generationToken, user: userDto };
    }
    
        const token = await tokenService.checkRefreshToken(refreshToken);
        if (token !== undefined) {
          }else{
           return {message: "refreshToken невалиден"}
          }
    }
    async validToken (accessToken: string, refreshToken: string) {
        const cheackAccess = tokenService.checkAccessToken(accessToken)
        if (cheackAccess == undefined) {
            return {message: "Не валиден", ok: false}
        }
        
    const findToken = await tokenService.findToken(refreshToken);
    if (findToken) {
        const user = await UserModel.findById(findToken.user);
        const userDto = new UserDto(user);
        return {ok: true, user: userDto}
    }else {
        return {ok: false, message: "Не найде refreshTokens"}

    }
    
    }


    async addBasket(id: number | string, text: string, price: string, image: string, refreshToken: string) {
        const findToken = await tokenService.findToken(refreshToken);
        
        if (findToken) {
            const user = await UserModel.findById(findToken.user);
            const userDto = new UserDto(user);
    
            let basket = await basketModel.findOne({ user: userDto.id });
    
            if (!basket) {
                basket = await basketModel.create({ user: userDto.id, products: [] });
            }
            
            // Проверка на наличие продукта
            const existingProduct = basket.products.find((el: any) => el.id === id);
    
            if (existingProduct) {
                console.log("count", existingProduct.count);
                
                existingProduct.count += 1;
            } else {
                basket.products.push({ id, text, price, image, count: 1 });
            }
    
            await basket.save();
            return { ok: true };
        } else {
            return { ok: false, message: "Токена нет" };
        }
    }
    

    async getBasket(refreshToken: string) {
        const findToken = await tokenService.findToken(refreshToken);
        if (findToken) {
            const user = await UserModel.findById(findToken.user);
            const userDto = new UserDto(user);
            const findProducts = basketModel.findOne({user: userDto.id})
            if (findProducts !== undefined) {
                return findProducts
            }
        }
    }


    async searchCart(search: string) {
        try {
            // Получаем все продукты из модели
            const products = await productsModel.find(); 
            

            const lowerSearch = search.toLowerCase()
            console.log(lowerSearch);
            
            const filteredProducts = products.filter((product: any) => {
                return product.text.toLowerCase().includes(lowerSearch);
            });
            
            console.log(filteredProducts, 161);
            
            return filteredProducts;
        } catch (error) {
            console.error("Ошибка при поиске продуктов:", error);
            throw error; // Можно обработать ошибку более детально в зависимости от ваших нужд
        }
    }
    async getProducts() {
        const products = await productsModel.find(); 
        return products
    }

    async logout(refreshToken: string) {
        const token = await tokenService.deleteToken(refreshToken);
        return token;
      }
}
module.exports = new UserService();