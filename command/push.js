'use strict';

const prequest = require('request-promise-native');
const configData = require('../libs/config-data.js');
const globals = require('../libs/globals.js');
const fs = require('fs');
const path = require('path');

module.exports = async _ => {

    let tokenContent = fs.readFileSync(globals.tokenFile);
    let tokenJson = JSON.parse(tokenContent);

    await prequest({
        uri: `${globals.host}:${globals.port}/images/push-to-repo`,
        method: 'POST',
        json: true,
        body: {
            image: configData.name,
            repository: configData.from,
            tokenJson: tokenJson,
        }
    });

}

