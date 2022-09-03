import * as mysql from 'mysql';
import { UpdateRequest } from '../types/packet';
import { config } from '../environment/config';
import { DatabaseRequest } from '../../client/types/database-request.type';
import { getMySqlQuery } from './sql-query';
import { WeightResult } from '../../client/types/weight-result.entry';

export class MySqlManager {

    constructor() {
        this.initConnection();
    }

    private async querySql(query: string) {
        const promise = new Promise<WeightResult[]>((resolve, reject) => {
            this.connection.query(
                query, (err, results) => {
                if(err) throw err;
                resolve(results as WeightResult[]); 
          });
        });
        return promise;
    }

    private initConnection() {
        this.connection = mysql.createConnection(config.mysql);
        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL server!');
          });
    }

    public async query(request: UpdateRequest, requestType: DatabaseRequest) {
        return await this.querySql(getMySqlQuery(requestType, request));
    }

    private connection: mysql.Connection;
}