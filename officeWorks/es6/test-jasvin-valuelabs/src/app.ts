import express from 'express';
import bodyParser from "body-parser";
import logger from './services/logger';
import routes from './routes/delivery';
import process from 'node:process';
let winston= require('express-winston');

const app = express();
// Not able to get the express winston logger
const winstonConf = {
    winstonInstance: logger,
    meta: false,
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    expressFormat: true,
    colorize: true,
    ignoreRoute: (req: any, res: any ) => false
};

process.on("uncaughtException", error => {
  console.dir(error);
  logger.info("uncaughtException");

  if (error.stack) logger.info(error.stack);
});

app.use(bodyParser.json());

app.use(winston.logger(winstonConf));
app.use("/api/delivery", routes);

const port = process.env.PORT || "3000";

app.listen(port, () =>  logger.info("Server listening on port: " + port));
