'use strict';

const request = require('request');
const prequest = require('request-promise-native');
const chalk = require('chalk');

const globals = require('../libs/globals');
const configData = require('../libs/config-data.js');
const wsClient = require('../libs/ws-client.js');

module.exports = async _ => {

    try {

        let result = await prequest({
            uri: `${globals.host}:${globals.port}/images/push-to-repo`,
            method: 'POST',
            json: true,
            body: {
                image: configData.name,
                repository: globals.repository,
            }
        });

        console.log(result);

    } catch (e) {

        console.log(e);
    
    }

    wsClient.close();

}

