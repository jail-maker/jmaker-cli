'use strict';

const imagePull = require('../action/image-pull.js');

exports.command = 'pull';

exports.describe = 'pull image from repository to server';

exports.builder = yargs => {

    return yargs;

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
