'use strict';

import * as  _  from 'lodash';
import * as path from 'path';

let jwt: any = require('jsonwebtoken');
let apps: any = {};

module.exports.handler = handler;

function handler(io: any): any {
  io.on('connection', fSocket);

  function fSocket(socket: any): any {

    console.info(process.pid + ': new connection for ' + socket.id);

    socket.emitback = emit;
    socket.cast = broadcast;
    socket.on('module', module);
    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('error', fError);

    socket.join('NG2');

    function emit(all: any, data: any) {
      if (all === 'all') {
        io.sockets.in(data.channel).emit(data.scope, data.data);
        console.info('sending to room ' + data.channel);
      } else {
        socket.emit(data.scope, data.data);
      }
    }

    function broadcast(type: any, msg: any) {
      io.to('NG2').emit(type, msg);
    }

    function fError(err: any): any {
      console.info('io.js err - Socket error ' + err);
    }

    function module(req) {
      try {
        require('../..' + req.script)[req.function](req, socket);
      } catch (err) {
        console.error('io.js : module function : ' + err);
      }
    }



    function disconnect(): any {
      console.info(process.pid + ': Disconnection from ' + socket.id);
    }
    function connect(): any {
      console.info('CLients are ', io.sockets.clients('NG2'));
    }
  }
}