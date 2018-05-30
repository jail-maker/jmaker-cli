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
    let rules = args.rules
        .reduce((acc, item) => {

            let [key, value = true] = item.split('=');
            acc[key] = value;
            return acc;

        }, {});

    try {

        let res = await request({
            method: 'POST',
            uri: `${args['server-protocol']}://${args['server-socket']}/containers/started`,
            json: true,
            timeout: null,
            body: {
                name,
                rules,
            },
        });

    } catch(e) {

        if(e.name == 'StatusCodeError') {

            throw new HttpError({msg: e.response.body, code: e.statusCode });

        }

        throw e;

    } finally {

        // logWebSocket.close();

    }

}
