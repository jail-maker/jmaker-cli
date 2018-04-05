'use strict';

const pushNoAuth = require('../action/push-no-auth.js');
const authJwtWebsm = require('../action/auth-jwt-websm.js');
const pushAuth = require('../action/push-auth.js');

exports.command = 'push';

exports.describe = 'push image from server to repository';

exports.builder = yargs => {

    return yargs
        .option('name', {
            describe: 'name of image to push'
        });

}

exports.handler = async args => {

    do {

        try {

            // try push if no authorization required
            await pushNoAuth(args);
            break;

        } catch(e) {

            console.log(e);
            // if jwt authorization required
            if(e.name === 'JwtAuthRequired') {

                try {

                    // accuire jwt
                    await authJwtWebsm(args);

                    // push using accuired jwt
                    await pushAuth(args);
                    break;

                } catch(e) {

                    if(e.name === 'AuthFailed') {

                        console.log('Auth failed');
                        continue;

                    } else if(e.name === 'Exists') {

                        console.log('Image Already Exists');
                        break;

                    } else if(e.name === 'NotFound') {

                        console.log('Image Not Found');
                        break;

                    }

                    throw e;

                }

            } else if(e.name === 'Exists') {

                console.log('Image Already Exists');
                break;

            } else if(e.name === 'NotFound') {

                console.log('Image Not Found');
                break;

            }

            throw e;

        }

    } while(true);

}
