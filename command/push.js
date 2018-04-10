'use strict';

const imagePushNoAuth = require('../action/image-push-no-auth.js');
const imagePushAuth = require('../action/image-push-auth.js');
const authJwtWebsm = require('../action/auth-jwt-websm.js');

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

                    console.log(`${e.code} ${e.msg}`);
                    break;

                } 

                // if other error
                throw e;

            }

            throw e;

        }

    } while(true);

}
