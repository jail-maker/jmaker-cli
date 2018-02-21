'use strict';

const request = require('request');
const prequest = require('request-promise-native');
const chalk = require('chalk');

const globals = require('../libs/globals');
const configData = require('../libs/config-data.js');
const wsClient = require('../libs/ws-client.js');

const imageExists = async (image) => {

    try {

        await prequest(`${globals.host}:${globals.port}/images/${image}`);
        return true;

    } catch (error) {

        if (error.statusCode === 404) return false;
        else throw error;

    }

}

const downloadFromRepo = async (image, repo = 'localhost:3000') => {

    await prequest({
        uri: `${globals.host}:${globals.port}/images/download-from-repo`,
        method: 'POST',
        json: true,
        body: {
            image: image,
            repository: repo
        }
    });

}

module.exports = async _ => {

    try {

        if (!(await imageExists(configData.name))) {

            await downloadFromRepo(configData.name, globals.repository);

        }

    } catch (error) {

        console.log(error);

    } finally {

        wsClient.close();

    }

}

