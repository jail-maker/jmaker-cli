'use strict';

const request = require('request-promise-native');
const fs = require('fs');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const compress = require('../lib/compress.js');
const ignored = require('../lib/ignored-files.js');

/**
 * throws StatusCodeError
 */

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    let logRoot = `${args['log-protocol']}://${args['log-socket']}`;

    let exclude = ignored.get();
    let archive = `/tmp/${jailConfig.name}-context.tar`;
    let cd = process.cwd();

    await compress('./', archive, {exclude, cd});
    let context = fs.createReadStream(archive);

    let logWebSocket = new LogWebSocket(logRoot, jailConfig.name);

    let res = await request({
        method: 'POST',
        uri: `${args['server-protocol']}://${args['server-socket']}/image-builder`,
        json: true,
        timeout: null,
        formData: {
            body: JSON.stringify(jailConfig),
            context: context,
        },
        resolveWithFullResponse: true,
    });

    logWebSocket.close();

    let code = res.statusCode;
    let body = res.body;

    if(code < 200 || code >= 300) {

        throw new StatusCodeError({msg: body, code: code});

    }


}
