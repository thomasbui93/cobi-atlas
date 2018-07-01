import 'reflect-metadata';
import { Express } from 'express';
import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { registerServices } from './types/register';
import Mongo from './database/Mongo';

import './controllers/index';
import { errorHandler } from './utils/error/error-handling';

const container = new Container();
registerServices(container);

const server = new InversifyExpressServer(container);
server.setConfig((app: Express) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(errorHandler);
  Mongo.initConnection();
});

server.build().listen(process.env.PORT || 8080);