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
        })
        // .option('auth', {
        //     describe: 'use authorization',
        //     choices: ['jwt'],
        //     default: 'jwt',
        // });

}

exports.handler = async args => {

    // switch(args['auth']) {

    //     case 'jwt': {
        
        
    //     }
    
    // }

    do {

        try {

            // try push if no authorization required
            await pushNoAuth(args);
            break;

        } catch(e) {

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

                    }

                    throw e;

                }

            }

            throw e;

        }

    } while(true);

}
