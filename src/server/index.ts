
/**
 * This file handles the working correct of the server with the connection to Next js
 */
import next from 'next';
import cors from 'cors';
import morgan from 'morgan';
import './db/connection'
import * as utils from './utils';
import passport from 'passport';
import express, { Request, Response } from "express";
import Express from './serverHandler/Express';
import fileUpload from 'express-fileupload';

import passportMiddleware from './middlewares/passport';

import authRouters from './auth';

const port = utils.server.getPortNumber();
const dev = !utils.server.isEnvironment('production');

const app = next({ dev });
const handle = app.getRequestHandler();

const middlewares = [
  cors(),
  morgan('dev'),
  express.urlencoded({extended: false}),
  express.json(),
  fileUpload(),
  passport.initialize()
];

app.prepare().then(() => {
  const server = new Express(port);

  server.loadMiddlewares(middlewares);

  passport.use(passportMiddleware);

  server.loadRoutes('api', '../api')
  .authRoutes('auth', authRouters)
  .all('*', (req: Request, res: Response) => {
    return handle(req, res);
  }).run();
});
