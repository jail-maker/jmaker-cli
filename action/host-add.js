'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const hosts = require('../lib/hosts.js');
const HttpError = require('../error/http-error.js');

/**
 * throws StatusCodeError
 */

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    try {

        let response = await request.get({
            uri: `${args['server-protocol']}://${args['server-socket']}/containers/list/${jailConfig.name}/runtime`,
            timeout: null,
        });

        response = JSON.parse(response);
        let jailInfo = response.info;
        let hostName = jailInfo['host.hostname'];
        let ipsv4 = [];
        let ipsv6 = [];

        if (jailInfo['ip4.addr']) {

            ipsv4 = jailInfo['ip4.addr'].split(',');

        }

        if (jailInfo['ip6.addr']) {

            ipsv6 = jailInfo['ip6.addr'].split(',');

        }

        let ips = [].concat(ipsv4, ipsv6);

        for (let ip of ips) hosts.addHost(ip, hostName);

        hosts.commit();

    } catch (error) {

        if (error.name == 'StatusCodeError') {

            throw new HttpError({
                msg: error.response.body,
                code: error.statusCode 
            });

        }

        throw error;

    }

}
