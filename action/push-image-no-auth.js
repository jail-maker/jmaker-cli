'use strict';

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const HttpError = require('../error/http-error.js');

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
            else if(response.statusCode < 200 || response.statusCode >= 300) 
                rej(new HttpError({msg: body, code: response.statusCode}));

        }

        let handlerTo = (error, response, body) => {

            if(error) rej(new Error(error));
            else if(response.statusCode < 200 || response.statusCode >= 300) 
                rej(new HttpError({msg: body, code: response.statusCode}));

            res();

        }

        request(fromParams, handlerFrom).pipe(request(toParams, handlerTo));

    });

}

