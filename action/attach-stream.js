'use strict';

const JailConfig = require('../lib/jail-config.js');

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    let name = args['name'] ? args['name'] : jailConfig.name;

    process.stdin.resume();

    // process.on('SIGINT', _ => {

    //     // console.log('Ctrl+C');
    //     // process.exit();

    // });

    process.stdin.on('data', _ => {

        console.log('read');
        // console.log(`readable: ${chunk}`);

    });
    // process.stdin.pipe(process.stdout);
    // process.stdin.pause();

}
