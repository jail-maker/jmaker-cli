'use strict';

const prequest = require('request-promise-native');
const request = require('request');
const fs = require('fs');
const chalk = require('chalk');
const HttpError = require('../error/http-error');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const compress = require('../lib/compress.js');
const compressStream = require('../lib/compress-stream.js');
const ignored = require('../lib/ignored-files.js');
const verifyErrorCode = require('../lib/verify-error-code.js');

/**
 * throws StatusCodeError
 */

module.exports = async args => {

    let jailConfig = new JailConfig(args);
    let name = args['set-name'];

    let logRoot = `${args['log-protocol']}://${args['log-socket']}`;
    let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;

    let exclude = ignored.get();
    let cd = process.cwd();

    // let logWebSocket = new LogWebSocket(logRoot, jailConfig.name);
    fs.writeFileSync('.manifest', JSON.stringify(jailConfig));

    let body = await (new Promise((resolve, reject) => {

        let stream = request.post({
            headers : {
                'content-type': 'application/x-tar',
            },
            uri: `${serverRoot}/containers/builder`,
        }, (error, res, body) => {

            // logWebSocket.close();

            if (error) {

                reject(error);

            } else if (res.statusCode !== 200) {

                let httpError = new HttpError({
                    msg: body, code: res.statusCode
                });
                reject(httpError);

            } else resolve(body);

        });

        let context = compressStream('./', {exclude, cd});

        context.pipe(stream);

    }));

    if (name) {

        let containerId = JSON.parse(body).id;

        await prequest.patch(`${serverRoot}/containers/list/${containerId}`, {
            body: { name },
            json: true,
        });

    }

}
