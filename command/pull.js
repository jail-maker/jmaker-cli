
'use strict';

const request = require('request');
const prequest = require('request-promise-native');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');

exports.command = 'pull';

exports.describe = 'pull jail';

exports.builder = yargs => {

    return yargs
        .option('name', {
            demandOption: true,
        });
}

exports.handler = async args => {

    // let jailConfig = new JailConfig(args);
    // let logWebSocket = new LogWebSocket(`${args['log-protocol']}://${args['log-socket']}`, jailConfig);

    // let name = args['name'];

    // try {

    //     if (!(await imageExists(args, name))) {

    //         await downloadFromRepo(args, name);

    //     }

    // } catch (error) {

    //     console.log(error);

    // } finally {

    //     logWebSocket.close();

    // }


}

// const imageExists = async (args, name) => {

//     try {

//         await prequest(`${args['server-protocol']}://${args['server-socket']}/images/${name}`);
//         return true;

//     } catch (error) {

//         if (error.statusCode === 404) return false;
//         else throw error;

//     }

// }

// const downloadFromRepo = async (args, name) => {

//     await prequest({
//         uri: `${args['server-protocol']}://${args['server-socket']}/images/download-from-repo`,
//         method: 'POST',
//         json: true,
//         body: {
//             image: name,
//             repository: args['repository-socket'],
//         }
//     });

// }
