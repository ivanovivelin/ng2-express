'use strict';
/*
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Headers, Http, Jsonp, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {

    private headers: any;
    private options: any;

    constructor(
        private http: Http,
        private jsonp: Jsonp

    ) {

        this.headers = new Headers(
            {
                Authorization: 'Bearer xxxxx',
                'Content-Type': 'application/json',
            }
        );
        this.options = new RequestOptions({ headers: this.headers });
    }

    public httpGet(url: string): Observable<any[]> {
        // console.log('$http.service (httpGet)');
        return this.http.get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public httpPost(url: string, body: any): Observable<any[]> {
        return this.http.post(url, JSON.stringify(flattenObject(body)), this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public jsonpGet(url: string): Observable<any[]> {
        return this.jsonp.get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public handleError(err: any): any {
        let msg: string = '';
        if (err._body !== undefined) {
            let body: any = err._body;
            try {
                body = JSON.parse(body);
            } catch (e) {
                //
            }
            if (body.message) {
                msg += body.message;
            } else {
                msg += body;
            }
        } else {
            msg += err.status + ' ' + err.statusText;
        }
        msg += ' - Url : ' + err.url;
        msg += ' - On ' + Date();

        console.log('$http.service (received observer error) => ' + msg); // log to console instead
        return Observable.throw(msg);
    }

    private extractData(res: Response): any {
        return res.json() || [{}];
    }

}

function flattenObject(ob: any): any {
    let toReturn: any = {};

    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) {
            continue;
        }

        if ((typeof ob[i]) === 'object') {
            let flatObject: any = flattenObject(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) {
                    continue;
                }
                toReturn[x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}
*/
