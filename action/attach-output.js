'use strict';

const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');

module.exports = async args => {

    let logRoot = `${args['log-protocol']}://${args['log-socket']}`;
    let logWebSocket = new LogWebSocket(logRoot, jailConfig.name);

    process.stdin.resume();

    process.stdin.on('SIGINT', _ => {

        logWebSocket.close()
        process.exit();

    });

}
