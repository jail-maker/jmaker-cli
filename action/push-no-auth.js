'use strict';
/**
 * throws 
 *      Unauthorized
 *      NotFound
 *      Conflict
 */

const request = require('request');
const JailConfig = require('../lib/jail-config.js');

const Unauthorized = require('../error/unauthorized.js');
const NotFound = require('../error/not-found.js');
const Conflict = require('../error/conflict.js');

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

        if(response.statusCode == 404) {

            throw new NotFound(body);

        } else if(response.statusCode < 200 || response.statusCode >= 300) {

            throw new Error(error);

        }

    }

    let handlerTo = (error, response, body) => {

        if(response.statusCode == 401) {

            throw new Unauthorized('JWT authorization required', 'jwt');

        } else if(response.statusCode == 409) {

            throw new Conflict(body);

        } else if(response.statusCode < 200 || response.statusCode >= 300) {

            throw new Error();

        }

    }

    request(fromParams, handlerFrom).pipe(request(toParams, handlerTo));

}

