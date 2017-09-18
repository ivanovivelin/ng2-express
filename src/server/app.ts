/**
 * @author Ivelin Ivanov
 */
/*  tslint:disable:no-var-requires */

'use strict';

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as socketio from 'socket.io';
import * as logger from './routes/common/logger';
import * as handler from './routes/common/dictionary';
// const input: any = fs.readFileSync('./ng2-boilerplate/wordlist.txt');

// const env: any = require('../env.json');
const app: any = express();

const p: string = path.resolve();

const passport: any = require('passport');
const Strategy: any = require('passport-facebook').Strategy;
const request: any = require('request');
const cookieParser: any = require('cookie-parser');
const bluemix: string = process.env.NODE_ENV || 'local';
require('./config/express')(app, passport, Strategy);

app.use(cookieParser());

app.get('/logout', (req: any, res: express.Response) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
    console.log('user logging out');
});

app.get('/login', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/500' }), (req, res) => {
          res.redirect('/help');
});
// add ensureAuthenticated to prorect the main route

app.get('/' , (req: any, res: any) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    req.headers['if-none-match'] = 'no-match-for-this';
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

app.get('*', (req: any, res: any) => {
    if (req.xhr) {
        res.status(400);
        res.send('');
        return;
    }
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

const server: any = require('http').Server(app);
const io: any = socketio.listen(server) as any;
      // io.set('transports', ['websocket']);

require('./routes/io').handler(io);

const appname: string = (process.env.APP === undefined) ? 'local application' : process.env.APP;

const msg: string = '$app => ' + appname + ' started with pid '
    + process.pid + ' on ' + (bluemix === undefined ? 'local' : 'bluemix ' + bluemix) + ` (node -v ${process.version})`;
console.log(msg);
logger.LogSuccess(msg, '$user', 'server startup');

let errMsg: string;

process.on('uncaughtException',  (err: any): any => {
    const today: any = new Date();
    errMsg = '$app.ts (uncaught) => ' + today.toUTCString() + ' uncaughtException:' + err.message;
    console.error(errMsg);
    console.error(err.stack);
    process.exit(1);
});

process.on('exit', (code) => {
    console.log(`$app.ts (exit) => fatal error, system shutting down : ${errMsg}`);
    setTimeout(
        () => { process.exit(1); }
        , 1000);
});


server.listen(app.get('port'), () => {
    console.log(`$app => server listening with node -v ${process.version} on port ${app.get('port')}`);
});

function ensureAuthenticated(req: any, res: any, next: any): any {
    console.log('going to middleware');
    if (req.isAuthenticated()) {
        console.log('$app (ensureAuthenticated) => authenticated');
        require('./config/login-openid')(req, res);
        next();
    } else {
        console.log('$app (ensureAuthenticated) => not authenticated');
        res.cookie('io-user', false, {
            expires: new Date(1),
            path: '/',
        });
        next();
    }
}

/**
 * @desc show all args passed to node
 */

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

// test param abc or user input
const word = process.argv[2] || `abc`;

/**
 * @author Ivelin Ivanov
 * @desc find all anagrams of the passed param
 * @param word {}
 */

/*
handler.checkIfAnagram(process.argv[2]).then((data) => {
    console.log(`Results found => ${data}`);
}).catch((err) => {
    console.error(err);
});
*/
