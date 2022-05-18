/**
 * Express class to create an Express server on Node JS
 */
import fs from 'fs';
import path from 'path';
import express from 'express';
import pluralize from "pluralize";

class Express {
  server;
  port: number;

  constructor(port:number){
    this.server = express();
    this.port = port;
  }

  loadRoutes(basePath: string,  dirPath: string) {
    const API_PATH = path.join(__dirname, dirPath);

    fs.readdirSync(API_PATH).forEach((api) => {
      const plural = pluralize(api.replace('.ts', '').replace('.js', ''));

      if (plural.indexOf('.') === -1 && plural !== '__tests__') {
        this.server.use(`/${basePath}/${plural}`, require(`${API_PATH}/${api}`));
      }
    });

    return this;
  }

  all(path: string, callback:any) {
    this.server.all(path, callback);
    return this;
  }

  loadMiddlewares(middlewares : Array<any>): void {
    middlewares.map(mw => this.server.use(mw));
  }

  run() {
    this.server.listen(this.port);
    console.log(`Server on port`, this.port);
  }
}


export default Express;
