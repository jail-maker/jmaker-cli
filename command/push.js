'use strict';

const pushNoAuth = require('../action/push-no-auth.js');
const authJwtWebsm = require('../action/auth-jwt-websm.js');
const pushAuth = require('../action/push-auth.js');
/**
 * if (it's possible to push without authorization) {
 *      do so
 * } else if (jwt authorization required) {
 *      accuire jwt from auth-server;
 *
 *      if(basic auth required) {
 *           enter username password, accuire token
 *      }
 *
 *      push to repository using jwt;
 *
 * }
 */

exports.command = 'push';

exports.describe = 'push image from server to repository';

exports.builder = yargs => {

    return yargs
        .option('name', {
            describe: 'name of image to push'
        });

}

exports.handler = async args => {

    try {

        // try push if no authorization required
        console.log('push without authorization');
        await pushNoAuth(args);

    } catch(e) {

        if(e.name == 'HttpError') {

            if(e.code == 401) { // if authorization required

                await handlePushAuthorized(args);

            } else if([400, 409].includes(e.code)) {

                console.log(e.message);

            } else {

                console.log(`push without authorization: code: ${e.code}, ${e.message}`);

            }

        } else throw e;

    }

}

async function handlePushAuthorized(args) {

    let i = 0;

    do {

        if(i) {

            console.log('accuiring jwt');

            try {

                await authJwtWebsm(args); // accuire jwt if use of exiting jwt failed

            } catch(e) {

                if(e.name == 'HttpError') {

                    if(e.code == 401) {

                        console.log('authorization failed');
                        continue;

                    }

                }

                throw e;

            }

        } else console.log('use existing jwt');

        ++i;

        try {

            console.log('push authorized');
            await pushAuth(args); // push using accuired jwt
            break;

        } catch(e) {

            if(e.name = 'HttpError') {

                if(e.code == 401) { // if unauthorized

                    console.log(e.msg);
                    continue;

                } else if ([400, 409]) { // if bad image format or image exists

                    console.log(e.msg);
                    break;

                } else {

                    console.log(`push authorized: code: ${e.code}, ${e.msg}`);

                }

            }

            throw e;

        }

        throw e;

    } while(true);


}
