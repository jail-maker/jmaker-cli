'use strict';

const printList = require('../action/print-list.js');

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

        await printList(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}
