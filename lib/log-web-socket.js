'use strict';

const chalk = require('chalk');
const WebSocket = require('ws');

module.exports = class LogWebSocket extends WebSocket {

    constructor(url, name) {

        super(url);

        this.on('open', _ => {

            console.log('connected');

            this.send(JSON.stringify({
                action: 'connect',
                channel: name,
                data: '',
            }));

        });

        this.on('message', this._logHandler);
        this.on('close', _ => console.log('disconnected'));

    }

    _logHandler(data) {

        let {
            level,
            text
        } = JSON.parse(data);

        switch (level) {

            case 3:
                text = chalk.green(text);
                break;

            case 2:
                text = chalk.yellow(text);
                break;

            case 1:
                text = chalk.red(text);
                break;

        }

        let stream = process.stdout;
        stream.write(text);

    }

}
