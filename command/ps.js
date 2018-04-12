'use strict';

const imageList = require('../action/image-list.js');
const jailList = require('../action/jail-list.js');

exports.command = 'ps';

exports.describe = 'print list of containers';

exports.builder = yargs => {

    return yargs
        .option('all', {
            alias: 'a',
            describe: 'all images',
        });

}

exports.handler = async args => {

    try {

        if(args['all']) {

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
