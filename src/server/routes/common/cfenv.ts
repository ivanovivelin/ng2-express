'use strict';

const Env: any = require('cfenv').getAppEnv();

function Credentials(process: string): any {
    return Env.getServiceCreds(process);
}

let modules: any = {
    Credentials,
};

module.exports = modules;
