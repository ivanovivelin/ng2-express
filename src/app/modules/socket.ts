
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io.connect('/', { forceNew: true});
  }

  getData(messageObject: any): Observable<any> {
    this.socket.emit('module', messageObject);
    return Observable.create(observer => {
      this.socket.on(messageObject.event, data => {
        observer.next(data);
      });
    });
  }
}