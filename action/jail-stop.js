'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const HttpError = require('../error/http-error.js');

module.exports = async args => {

    let jailConfig = new JailConfig(args);
    let logRoot = `${args['log-protocol']}://${args['log-socket']}`;
    // let logWebSocket = new LogWebSocket(logRoot, jailConfig.name);
    let name = args.name ? args.name : jailConfig.name;

    try {

        console.log(`${args['server-protocol']}://${args['server-socket']}/containers/started/${name}`);
        let res = await request.delete({
            uri: `${args['server-protocol']}://${args['server-socket']}/containers/started/${name}`,
        });

    } catch(e) {

        if (e.name == 'StatusCodeError') {

            throw new HttpError({msg: e.response.body, code: e.statusCode });

        }

        throw e;

    } finally {

        // logWebSocket.close();

    }

}
