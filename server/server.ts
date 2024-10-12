import "dotenv/config"; // для конфигурации
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
const router = require("./router/router");
const app = express()


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json()); // <--- Добавьте это перед маршрутизацией
app.use(router);


const PORT = process.env.PORT || 3000;
const URLMongoose = process.env.MONGODB_URI || "mongodb://localhost:27017/plant_shop";




const start = async () => {
  try {
    await mongoose
      .connect(URLMongoose)
      .then(() => console.log("Сервер работает"))
      .catch((err: any) => console.log(`Ошибка при запуске : ${err}`));

    app.listen(PORT, () => console.log(`Сервре запустился на ${PORT} порту`));
  } catch (error) {
    console.log(error);
  }
};

start()