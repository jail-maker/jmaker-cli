'use strict';
/**
 * throws JwtAuthRequired
 */

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const JwtAuthRequired = require('../error/jwt-auth-required.js');
const NotFound = require('../error/not-found.js');

module.exports = async (config) => {

    let jailConfig = new JailConfig(config);
    let name = jailConfig.name;

    let serverRoot = `${config['server-protocol']}://${config['server-socket']}`;
    let repositoryRoot = `${config['repository-protocol']}://${config['repository-socket']}`;

    let fromParams = {
        method: 'GET',
        uri: `${serverRoot}/images/${name}/exported`
    };

    let toParams = {
        headers: {
            'Content-Type' : 'application/x-xz',
        },
        method: 'POST',
        uri: `${repositoryRoot}/image-importer`,
    }

    let handlerFrom = (error, response, body) => {

        if(response.statusCode == 404) throw new NotFound();

        if(response.statusCode < 200 || response.statusCode >= 300) {

            throw new Error(error);

        }

    }

    let handlerTo = (error, response, body) => {

        console.log(response);
        if(response.statusCode == 401) {

            throw JwtAuthRequired();

        }

        if(response.statusCode < 200 || response.statusCode >= 300) {

            throw new Error(error);

        }

    }

    request(fromParams, handlerFrom).pipe(request(toParams), handlerTo);

}
