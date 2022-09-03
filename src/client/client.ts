import $ from 'jquery';
import { WeightResult } from './types/weight-result.entry';
import { Routes } from '../server/routes';
import { config } from '../server/environment/config';
import { DatabaseRequest } from './types/database-request.type';
import { HttpRequest } from './types/http-request.type';
import { UpdateResponse } from 'src/server/types/packet';
import { GUI } from './user-interface';

interface ResolvablePromise<T> {
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
}

export class WeightTrackerClient {

    constructor() {}

    public async init() {
        this.gui = new GUI();
        this.gui.init();
        this.closeEditWindow();
        this.closeConfirmRemoveWindow();
        this.gui.resetFields();
    //    await this.updateWeightsTable();
    }

    public openEditWindow(id: number) {
        this.gui.openEditWindow(id);
    }

    public closeEditWindow() {
        this.gui.closeEditWindow();
    }

    public openConfirmRemoveWindow(id: number) {
        this.gui.openConfirmRemoveWindow(id);
    }

    public closeConfirmRemoveWindow() {
        this.gui.closeConfirmRemoveWindow();
    }

    public removeSelectedRow() {
        this.requestOnWeightResult(this.gui.selectedRow, null, 'delete');
    }

    public async updateWeightsTable() {
        const results = await this.requestWeightResults();
    //  this.gui.clearTable();
        for(let result of results.results) {
            this.addEntry(result);
        }
    }

    public getUpdatedWeightResult() {
        return this.gui.getUpdatedResult();
    }

    public sendValuesToServer() {
        const weight = this.gui.getWeightFromInput() as number;
        const weightEntry: WeightResult = {
            weight,
            password: this.gui.getPasswordFromField()
        };
        this.sendAjaxRequest('POST', this.buildRequestPath('create'), weightEntry, this.onUpdateWeightResultSucceeded.bind(this));
    }

    public async requestWeightResults(): Promise<UpdateResponse> {
        return await this.sendAjaxRequest('GET', this.buildRequestPath('read'), null, this.onUpdateWeightResultSucceeded.bind(this));
    }

    public async requestOnWeightResult(id: number, weight: number, requestType: DatabaseRequest): Promise<UpdateResponse> {
        const weightEntry: WeightResult = {
            id, weight,
            password: this.gui.getPasswordFromField()
        };
         return await this.sendAjaxRequest('POST', this.buildRequestPath(requestType), weightEntry, this.onUpdateWeightResultSucceeded.bind(this));
    }

    public addEntry(weightEntry: WeightResult) {
        this.gui.addEntry(weightEntry);
    }

    private sendAjaxRequest(requestType: HttpRequest, url: string, weightEntry: WeightResult, 
            successCallback: (params: JQuery.TypeOrArray<JQuery.Ajax.SuccessCallback<any>>) => any) {  
        const promise = new Promise<UpdateResponse>((resolve, reject) => {
            this.resolvablePromise = {
                resolve,
                reject
            };
            if(requestType === 'POST') {
                const settings: JQuery.AjaxSettings<any> = {
                    type: requestType,
                    url,
                    data : JSON.stringify(weightEntry),
                    contentType: "application/json; charset=UTF-8",
                    success: (data, status, xhr) => {
                        successCallback(data);
                    },
                    error: (err) =>  {
                        console.log('error', err);
                    },
                    crossDomain: true,
                    dataType: 'json'
                };

                $.ajax(settings);

            } else if(requestType === 'GET') {
                $.get(url, data => {
                    this.results = data.results;
                    resolve(data as UpdateResponse);
                });
            }
        });

        return promise;
    }

    private buildRequestPath(requestType: DatabaseRequest): string {
        let actionPath = '';
        switch(requestType) {
            case 'create':
                actionPath = Routes.CREATE_PATH;
                break;
            case 'update':
                actionPath = Routes.UPDATE_PATH;
                break;
            case 'read':
                actionPath = Routes.READ_PATH;
                break;
            case 'delete':
                actionPath = Routes.DELETE_PATH;
                break;
            default:
                actionPath = Routes.READ_PATH;
        }
        const fullRequestPath = `${Routes.METHOD}://${config.serverAddress}:${config.serverPort}${actionPath}`;
        return fullRequestPath;
    }

    private onUpdateWeightResultSucceeded(params: JQuery.TypeOrArray<JQuery.Ajax.SuccessCallback<any>>): any {
        if(this.resolvablePromise) {
            this.resolvablePromise.resolve(null);
            this.resolvablePromise = null;
            this.init();
        }
    }

    private resolvablePromise: ResolvablePromise<UpdateResponse> = null;
    private gui: GUI;
    private results: WeightResult[] = [];
}