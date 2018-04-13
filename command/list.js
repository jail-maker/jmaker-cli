'use strict';

const imageList = require('../action/image-list.js');
const jailList = require('../action/jail-list.js');

exports.command = 'list';

exports.describe = 'print list of containers';

exports.builder = yargs => {

    return yargs
        .option('images', {
            alias: 'i',
            describe: 'show images',
        });

}

exports.handler = async args => {

    try {

        if(args['i']) {

            console.log(await imageList(args));

        } else {

            console.log(await jailList(args));

        }

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}
