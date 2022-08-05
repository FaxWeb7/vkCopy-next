const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const chalk = require("chalk");
const indexRoutes = require("./routes/index");
const errorMiddleware = require('./middlewares/error-middleware')

const app = express();
const successMsg = chalk.bgKeyword("green").white.bold;
const errorMsg = chalk.bgKeyword("white").red;
const reqMsg = chalk.bgKeyword("purple").cyan.bold.underline;

mongoose  
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })  
  .then((res) => console.log(successMsg('Connected to DB'))) 
  .catch((error) => console.log(errorMsg(error)));

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`Listening port ${process.env.PORT}`));
});

app.use(
  morgan(
    reqMsg(":method :url :status :res[content-length] - :response-time ms")
  )
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use('/api', indexRoutes);
app.use(errorMiddleware)
