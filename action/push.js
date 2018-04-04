'use strict';

const request = require('request');
const chalk = require('chalk');

exports = async params => {

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
        uri: `${repositoryRoot}/images/`,
    }

    let handlerFrom = (error, response, body) => {

        if(response.statusCode == 200) {
        
        
        } else if(response.statusCode == 401) {
        

        } else throw new Error({message: 'unable to push'})

    }

    request(fromParams, handlerFrom).pipe(request(toParams), handlerTo);

    return this.status;

}
