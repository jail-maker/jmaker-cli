'use strict';

const imagePushNoAuth = require('../action/image-push-no-auth.js');
const imagePushAuth = require('../action/image-push-auth.js');
const authJwtWebsm = require('../action/auth-jwt-websm.js');

exports.command = 'push [name]';

exports.describe = 'push image to repository';

exports.builder = yargs => {

    return yargs
        .positional('name', {
            describe: 'name of image to push'
        })
        .option('auth', {
            alias: 'a',
            type: 'boolean',
            describe: 'force authorization',
        })
        .option('auth-update', {
            alias: 'u',
            type: 'boolean',
            describe: 'force update authorization token',
        });

}

exports.handler = async args => {

    if(args['auth-update']) {

        while(true) {

            try {

                await authJwtWebsm(args);
                break;

            } catch(e) {

                if(e.name == 'HttpError') {

                    if(e.code == 401) {

                        continue;

                    }

                }

                throw e;

            }

        }

    }

    if(args['auth']) {

        await handlePushAuthorized(args);

    } else {

        await handleDefault(args);

    }

}

async function handleDefault(args) {

    try {

        // try push if no authorization required
        console.log('push without authorization');
        await imagePushNoAuth(args);

    } catch(e) {

        if(e.name == 'HttpError') {

            if(e.code == 401) { // if authorization required

                await handlePushAuthorized(args);

            } else {

                console.log(`${e.code} ${e.message}`);

            }

        } else throw e;

    }

}

async function handlePushAuthorized(args) {

    let i = 0;

    do {

        if(i) {

            try {

                await authJwtWebsm(args); // accuire jwt if use of exiting jwt failed

            } catch(e) {

                if(e.name == 'HttpError') {

                    if(e.code == 401) {

                        continue;

                    }

                }

                throw e;

            }

        } else console.log('use existing jwt');

        ++i;

        try {

            console.log('push authorized');
            await imagePushAuth(args); // push using accuired jwt
            break;

        } catch(e) {

            if(e.name = 'HttpError') {

                if(e.code == 401) { // if unauthorized

                    console.log(`invalid token`);
                    continue;

                } else if ([400, 409].includes(e.code)) { // if bad image format or image exists

                    console.log(`${e.code} ${e.message}`);
                    break;

                } 

                // if other error
                throw e;

            }

            throw e;

        }

    } while(true);

}
