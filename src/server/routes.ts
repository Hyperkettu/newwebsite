import * as express from 'express';
import { MySqlManager } from './mysql/mysql';
import { UpdateRequest } from './types/packet';

export class Routes {

    static METHOD: string = 'http';
    static UPDATE_PATH: string = '/api/update';
    static CREATE_PATH: string = '/api/add';
    static READ_PATH: string = '/api/get';
    static DELETE_PATH: string = '/api/remove';

    constructor(app: express.Application, mySqlManager: MySqlManager) {
        this.app = app;
        this.mySqlManager = mySqlManager;
    }

    private setupAddWeightEntry() {
        this.app.post(Routes.CREATE_PATH, async (request, response) => {
            const updateRequest = request.body as UpdateRequest;
            if(updateRequest.password != 'wTians4m')
            return;
            await this.mySqlManager.query(updateRequest, 'create');
            response.json({ status: 200});
          });
    }

    private setupUpdateWeightEntry() {
        this.app.post(Routes.UPDATE_PATH, async (request, response) => {
            const updateRequest = request.body as UpdateRequest;
            if(updateRequest.password != 'wTians4m')
            return;
            await this.mySqlManager.query(updateRequest, 'update');
            response.json({ status: 200 });
          });
    }

    private setupRemoveWeightEntry() {
      this.app.post(Routes.DELETE_PATH, async (request, response) => {
          const updateRequest = request.body as UpdateRequest;
          if(updateRequest.password != 'wTians4m')
            return;

          await this.mySqlManager.query(updateRequest, 'delete');
          response.json({ status: 200 });
        });
  }

    private setupGetWeightEntries() {
      this.app.get(Routes.READ_PATH, async (request, response) => {
        const results = await this.mySqlManager.query(null, 'read');
        response.json({ status: 200, results });
      });
    }

    public getRoutes(): void {
        this.setupGetWeightEntries();
        this.setupUpdateWeightEntry();
        this.setupAddWeightEntry();
        this.setupRemoveWeightEntry();
    }

    private app: express.Application;
    private mySqlManager: MySqlManager;
}