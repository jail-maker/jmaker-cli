'use strict';

const imagePull = require('../action/image-pull.js');

exports.command = 'pull [name]';

exports.describe = 'pull image from repository';

exports.builder = yargs => {

    return yargs
        .positional('name', {
            description: 'name of container',
        });

}

exports.handler = async args => {

    try {

        await imagePull(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }
}
