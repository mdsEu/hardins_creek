
/**
 * This file handles the working correct of the server with the connection to Next js
 */
import next from 'next';
import cors from 'cors';
import morgan from 'morgan';
import './server/db/connection'
import * as utils from './server/utils';
import express, { Request, Response } from "express";
import Express from './server/serverHandler/Express';

const port = utils.server.getPortNumber();
const dev = !utils.server.isEnvironment('production');

const app = next({ dev });
const handle = app.getRequestHandler();

const middlewares = [
  cors(),
  morgan('dev'),
  express.urlencoded({extended: false}),
  express.json()
];

app.prepare().then(() => {
  const server = new Express(port);

  server.loadMiddlewares(middlewares);

  server.loadRoutes('api', '../api').all('*', (req: Request, res: Response) => {
    return handle(req, res);
  }).run();
});
