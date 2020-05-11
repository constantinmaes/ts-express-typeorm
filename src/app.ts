import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Connection, createConnection} from 'typeorm';
import { Routes } from './config/routes';

class App {
  public app: express.Application;
  public connection: Connection;
  public routePrv: Routes = new Routes();

  constructor () {
    createConnection().then((connection: Connection) => {
      this.connection = connection;
    }).catch(error => console.log(error));
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config () {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;