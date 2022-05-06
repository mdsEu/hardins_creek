import express from 'express';

class Express {
  server;
  port: number;

  constructor(port:number){
    this.server = express();
    this.port = port;
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
