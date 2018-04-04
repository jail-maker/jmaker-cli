'use strict';

const pushNoAuth = require('../action/push-no-auth.js');
const authJwtWebsm = require('../action/auth-jwt-websm.js');
const pushAuth = require('../action/push-auth.js');

exports.command = 'push';

exports.describe = 'push image from server to repository';

exports.builder = yargs => {

    return yargs;

}

exports.handler = args => {

    let res = undefined;
    let auth = undefined;

    do {

        try {

            pushNoAuth(args);
            break;

        } catch(e) {

            if(e.name !== 'RepositoryJwtAuthRequired') {

                throw e;

            } else {

                auth = authJwtWebsm(args);

                try {

                    res = pushAuth(args, auth);
                    break;

                } catch(e) {

                    if(e.name !== 'RepositoryJwtAuthFailed') {

                        throw e;

                    } else {

                        console.log('Auth failed');

                    }

                }

            }

        }

    } while(true);

}
