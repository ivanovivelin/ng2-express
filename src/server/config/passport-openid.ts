'use strict';

let env: any = require('../../env.json');
let node_env: any = env.NODE_ENV;

const cfEnv: any = require('cfenv');
const cfAppEnv: any = cfEnv.getAppEnv();

const OpenIDConnectStrategy: any = require('passport-idaas-openidconnect').IDaaSOIDCStrategy;

module.exports.authenticate = (origin: any) => {

    let sso: any;
    if (origin === 'www') {
        sso = cfAppEnv.getServiceCreds(process.env.SSO) || env.sso;
    } else {
        sso = cfAppEnv.getServiceCreds(process.env.SSOW3) || env.ssow3;
    }

    const Strategy: any = new OpenIDConnectStrategy({
        authorizationURL: sso.authorization_url,
        tokenURL: sso.token_url,
        clientID: sso.clientid,
        scope: 'openid',
        response_type: 'code',
        clientSecret: sso.secret,
        callbackURL: 'https://' + sso.site + '/auth/sso/callback',
        skipUserProfile: true,
        issuer: sso.issuer_id,
    },
        (iss: any, sub: any, profile: any, accessToken: any, refreshToken: any, params: any, done: any) => {
            process.nextTick(() => {
                profile.accessToken = accessToken;
                profile.refreshToken = refreshToken;
                done(null, profile);
            });
        });
    return Strategy;
};
