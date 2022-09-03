import express from 'express';
import * as exp from 'express';
import { createServer, Server } from 'http'; 
import { MySqlManager } from './mysql/mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './environment/config';

export class WeightTrackerServer {

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
        this.app.use(bodyParser.json());        
        this.app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*'); 
            res.header('Access-Control-Allow-Headers', ['Origin, X-Requested-With, Content-Type, Accept']);
            res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST']); 

            next();
        });
        this.app.use(cors({ origin: '*' }));
    }

    private config(): void {
        this.port = process.env.PORT || config.serverPort;
        this.mySqlManager = new MySqlManager();
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running weight tracker server on port %s', this.port);
        });
    }

    public getApp(): exp.Application {
        return this.app;
    }

    public getMySqlManager() {
        return this.mySqlManager;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private app: express.Application;
    private port: string | number;
    private server: Server;
    private mySqlManager: MySqlManager;
}