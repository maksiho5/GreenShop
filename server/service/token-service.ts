const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");
class TokenService {
  generationToken<P extends Object>(playd: P) {
    const accessToken = jwt.sign(playd, process.env.JWT_ACCESS, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(playd, process.env.JWT_REFRESH, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async findToken(refreshToken: any) {
    try {
      const token = await tokenModel.findOne({ refreshToken: refreshToken });
      console.log(token);

      return token;
    } catch (e) {
      console.log(e);
    }
  }
  async saveToken(userId: string, refreshToken: string) {
    const checkToken = await tokenModel.findOne({ user: userId });
    if (checkToken) {
        checkToken.refreshToken = refreshToken;
        return checkToken.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token; 
}

  async deleteToken(refreshToken: string) {
    try {
      const token = tokenModel.deleteOne({ refreshToken: refreshToken });
      return token;
    } catch (e) {
      console.log(e);
    }
  }
  async checkRefreshToken(refreshToken: string) {
    try {
      const token = jwt.verify(refreshToken, process.env.JWT_REFRESH);
      return token;
    } catch (e) {
      console.log("ошибка при проверки токена" + e);
    }
  }
  async checkAccessToken(accessToken: string) {
    try {
      const token = jwt.verify(accessToken, process.env.JWT_ACCESS);
      return token;
    } catch (e) {
      console.log("Access токен не валидный");
      //   res.status(404).json("Access токен не валидный")
    }
  }

}

module.exports = new TokenService();
