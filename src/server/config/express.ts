'use strict';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';

const redisstore: any = require('connect-redis')(session);
const redis: any = require('./redis');

module.exports = function module(app: any, passport: any, strategy: any): void {

    app.use( (req: any, res: any, next: any): void => {
        const schema: any = req.headers['x-forwarded-proto'];
        if (schema === 'https' && process.env.NODE_ENV !== undefined) {
            return next();
        }
        if (process.env.NODE_ENV === undefined) {
            return next();
        }
        res.redirect('https://' + req.headers.host + req.url);
    });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.set('case sensitive routing', false);
    app.set('host', process.env.HOST || 'localhost');
    app.set('port', process.env.PORT || 8192);
    app.set('view cache', true);
    app.use(compression());
    app.locals.pretty = true;

    app.use((req: any, res: any, next: any) => {
        const schema: any = (req.headers['x-forwarded-proto'] || '').toLowerCase();
        if (schema === 'https') {
            next();
        } else if (process.env === 'production') {
            res.redirect('https://' + req.get('host') + req.url);
        } else {
            next();
        }
    });
    app.use(express.static(path.join(__dirname, '../../dist/client'), {index: false}));

    app.use('/angular', express.static('node_modules/@angular', {
        etag: false,
        maxAge: 1536000000,
    }));

    app.use('/modules', express.static('node_modules', {
        maxAge: 31536000000,
    }));

    const sess: any = {
        cookie: {
            httpOnly: true,
            maxAge: 86400000,
            path: '/',
        },
        genid:  (req: any) => {
            return guid(); // use UUIDs for session IDs
        },
        key: 'JSESSIONID',
        resave: false,
        saveUninitialized: false,
        secret: 'as5HjIILYjdjet',
        store: new redisstore({
            client: redis,
        }),
    };

    app.use(session(sess));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new strategy({
            clientID: 'clientID', // put your clientID
            clientSecret: 'clientSecret', //put your clientSecret
            callbackURL: 'callbackURL', // put your callbackURL
            profileFields: ['id', 'displayName', 'photos', 'email'],
        }, (accessToken: any, refreshToken: any, profile: any, cb: any) => {
            process.nextTick(() => {
                profile.accessToken = accessToken;
                profile.refreshToken = refreshToken;
                return cb(null, profile);
            });
    }));

    passport.serializeUser((user: any, cb: any) => {
            cb(null, user);
    });

    passport.deserializeUser((obj: any, cb: any) => {
            cb(null, obj);
    });
};

function ensureAuthenticated(req: any, res: any, next: any) {
    if (req.isAuthenticated()) {
        console.info('$express (ensureAuthenticated) => authenticated');
        res.sendFile(path.resolve('app') + '/main.js');
    } else {
        console.info('$express (ensureAuthenticated) => not authenticated');
        res.sendFile(path.resolve('app') + '/main.js');
    }
}

function guid(): string {
    function _p8(s: boolean): string {
        const p: string = (Math.random().toString(16) + '000000000').substr(2, 8);
        return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
    }
    const t: string = _p8(false) + _p8(true) + _p8(true) + _p8(false);
    return t.toLowerCase();
}
