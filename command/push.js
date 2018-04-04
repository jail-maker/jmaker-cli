'use strict';

// const request = require('request');
// const chalk = require('chalk');
// const JailConfig = require('../lib/jail-config.js');
// const LogWebSocket = require('../lib/log-web-socket.js');
// const fs = require('fs');
// const path = require('path');
// const DependencyResolver = require('../lib/dependency-resolver.js');

const push = require('../action/push.js');
const auth = require('../action/auth.js');
const pushAuth = require('../action/push-auth.js');

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

    // let jailConfig = new JailConfig(args);

    // let name = jailConfig.name;

    // let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;
    // let repositoryRoot = `${args['repository-protocol']}://${args['repository-socket']}`;

    // let fromParams = {
    //     method: 'GET',
    //     uri: `${serverRoot}/images/${name}/exported`
    // };

    // let toParams = {
    //     headers: {
    //         'Content-Type' : 'application/x-xz',
    //     },
    //     method: 'POST',
    //     uri: `${repositoryRoot}/images/`,
    // }

    // request(fromParams).pipe(request.post(toParams));

}
