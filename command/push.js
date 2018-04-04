'use strict';

const push = require('../request/push.js');
const auth = require('../request/auth.js');
const pushAuth = require('../request/push-auth.js');

exports.command = 'push';

exports.describe = 'push image from server to repository';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    let res = undefined;
    let auth = undefined;

    do {

        try {

            push(args);
            break;

        } catch(e) {

            if(e.status !== 401) {

                throw e;

            } else {

                auth = auth();
                res = pushAuth(args, auth);

            }

        }

    } while(true);

}
