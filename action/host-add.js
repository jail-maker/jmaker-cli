'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const Hosts = require('../lib/hosts.js');
const HttpError = require('../error/http-error.js');

/**
 * throws StatusCodeError
 */

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    try {

        let jailInfo  = (await request({
            method: 'GET',
            uri: `${args['server-protocol']}://${args['server-socket']}/jails/${jailConfig.name}`,
            json: true,
            timeout: null,
            body: jailConfig,
        })).info;

        let hostName = jailInfo['host.hostname'];

        let ipsv4 = [];
        if(jailInfo['ip4.addr']) {

            ipsv4 = jailInfo['ip4.addr'].split(',');

        }

        let ipsv6 = [];
        if(jailInfo['ip6.addr']) {

            ipsv6 = jailInfo['ip6.addr'].split(',');

        }

        let ips = [].concat(ipsv4, ipsv6);

        for(let ip of ips)
            Hosts.addHost(ip, hostName);

        Hosts.commit();

    } catch (e) {

        if(e.name == 'StatusCodeError') throw new HttpError({msg: e.response.body, code: e.statusCode });
        throw e;

    }

}
