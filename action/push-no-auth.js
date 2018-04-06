'use strict';
/**
 * throws 
 *      Unauthorized
 *      NotFound
 *      Conflict
 */

const request = require('request');
// const request = require('request-promise');
const JailConfig = require('../lib/jail-config.js');

const Unauthorized = require('../error/unauthorized.js');
const NotFound = require('../error/not-found.js');
const Conflict = require('../error/conflict.js');

module.exports = async (config) => {

    return new Promise((res, rej) => {

        let jailConfig = new JailConfig(config);
        let name = config['name'] != undefined ? config['name'] : jailConfig.name;

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

            if(error) rej(new Error(error));
            else if(response.statusCode == 404) rej(new NotFound(body));
            else if(response.statusCode < 200 || response.statusCode >= 300) rej(new Error(body));

        }

        let handlerTo = (error, response, body) => {

            if(error) rej(new Error(error));
            else if(response.statusCode == 401) rej(new Unauthorized('JWT authorization required', 'jwt'));
            else if(response.statusCode == 409) rej(new Conflict(body));
            else if(response.statusCode < 200 || response.statusCode >= 300) rej(new Error(body));

            res();

        }

        request(fromParams, handlerFrom).pipe(request(toParams, handlerTo));

    });

}

