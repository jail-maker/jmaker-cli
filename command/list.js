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

        let res = [];
        if(args['i']) {

            res = await imageList(args);

        } else {

            res = await jailList(args);

        }

        for(let item of res)
            process.stdout.write(item + '\n');

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}
