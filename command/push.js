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

    // catch connection exceptions
    try {

        do {

            try {

                // try push if no authorization required
                await pushNoAuth(args);
                break;

            } catch(e) {

                // if jwt authorization required
                if(e.name == 'Unauthorized' && e.type == 'jwt') {

                    try {

                        // accuire jwt
                        await authJwtWebsm(args);

                        // push using accuired jwt
                        await pushAuth(args);
                        break;

                    } catch(e) {

                        if(e.name === 'Forbidden') {

                            console.log('Auth failed');
                            continue;

                        } else if(['Conflict', 'NotFound'].includes(e.name)) {

                            console.log(e.message);
                            break;

                        }

                        throw e;

                    }

                } else if(['Conflict', 'NotFound'].includes(e.name)) {

                    console.log(e.message);
                    break;

                }

                throw e;

            }

        } while(true);

    } catch(e) {

        if(e.name == 'RequestError') {

            console.log('Connection failed');
            return;

        }

        throw e;

    }

}
