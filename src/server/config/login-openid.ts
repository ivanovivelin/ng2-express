'use strict';

import * as jwt from 'jsonwebtoken';

module.exports = (req: any, res: any) => {

    const sessionCookie: any = req.session.cookie;
    const expiresIn: any = sessionCookie.originalMaxAge;
    const user: any = req.session.passport.user._json;
    console.log('$login => ' +  req.session.passport.user._json.name + ' logged in');

    const name: any = toProperCase(user.name);
    const out: any = {
        email: name,
        name: name.trim(),
    };

    const token: any = makeToken(out, req);
    res.append('Set-Cookie', 'io-user=' + token + ';Path=/;maxAge: 86400000,expires:' + new Date(Date.now() + 86400000));
    // res.cookie('io-user', token);
};

function _cs(i: string): any {
    return i.toLowerCase();
}

function toProperCase(input: string): any {
    if (input === undefined) {
        return '';
    }
    return input.replace(/\w\S*/g, (txt: string) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function makeToken(profile: any, req: any): any {
    let groupIds: any;
    const user: any = req.session.passport.user._json;
    if (user) {
        groupIds = user.groupIds;
    }

    // const t: any = require('./user-roles')(groupIds); // To test access roles
    // profile.roles = t.roles;
    // profile.access = t.access;

    const crypto: any = require('crypto');
    const algorithm: any = 'aes-256-ctr';
    const password: any = 'd6F3Efeq';

    function encrypt(text: string): any {
        const cipher: any = crypto.createCipher(algorithm, password);
        let crypted: any = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    function decrypt(text: any): any {
        const decipher: any = crypto.createDecipher(algorithm, password);
        let dec: any = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }

    const jwth: any = {
        'typ': 'JWT',
        'alg': 'HS256',
    };
    const jwth_pw: any = new Buffer(JSON.stringify(jwth)).toString(
        'base64');

    const token: any = jwt.sign(profile, 'boards-lab', {
        header: jwth,
        expiresIn: '1d', // expires after 5 days,
    });
    return token;
}
