'use strict';

export function logError(err: string, user: string, event: string) {
    console.error(`Error happened on ${event}, by ${user},  error => ${err}`);
}

export function LogSuccess(message: string, user: string, event: string) {
    console.log(`${message} by ${user} on ${event}`);
}
