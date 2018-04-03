'use strict';

const request = require('request-promise-native')

module.exports = class DependencyResolver {

/**
 * dependency resolver
 * @constructor
 * @param {string} serverRoot
 * @param {string} repositoryRoot
 */
    constructor(serverRoot, repositoryRoot) {

        this.server = serverRoot;
        this.repository = repositoryRoot;

    }

/**
 * resolves all images required by specified one
 * @param imageName
 * @returns {array} returns array of required image names in chronological order
 */
    async resolve(imageName) {

        // get all required for download images from server
        let awail = await request({
            method: 'GET',
            uri: `${this.server}/images`,
            json: true, // parses response to json
        })
            .then(res => res.items)
            .then(res => res.map(image => image.name));

        let parents = await request({
            method: 'GET',
            uri: `${this.repository}/images/${imageName}/parents`,
            json: true,
        })
            .then(res => res.map(image => image.name));

        let install = parents.filter(name => ! awail.includes(name));

        return install;

    }

}
