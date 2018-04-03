
'use strict';

// const request = require('request');
const request = require('request-promise-native');
// const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
// const LogWebSocket = require('../lib/log-web-socket.js');
const Repository = require('../lib/repository.js');
const global = require('../lib/global.js');
const fs = require('fs');

exports.command = 'export';

exports.describe = 'export image to repository';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    // get all parent's names
    // get all parents images
    // pipe all images to server with manifest in archive


    // let jailConfig = new JailConfig(args);

    // let repository = `${args['repository-protocol']}://${args['repository-socket']}`;
    // let sourceUri = `${repository}/api/v1/images/${jailConfig.name}/data`;

    // let server = `${args['server-protocol']}://${args['server-socket']}`;
    // let dstUri = `${server}/images`;

    // request({
    //     method: 'GET',
    //     uri: dstUri,
    //     json: true,
    //     timeout: null,
    //     body: body,
    // }, (error, response, body) => {

    //     let code = response.statusCode;

    //     if (code !== 200) {

    //         console.log(chalk.red(`failed fetch from repository: ${code} ${body}`));
    //         return;

    //     }

    // });

    // request.on('response')

    // request({
    //     method: 'GET',
    //     uri: sourceUri,
    // })
    //     .pipe(
    //         request(
    //             method: 'POST',
    //         )
    //     );

    // request.get(sourceUri).pipe(request.post(dstUri));

    let {
        image,
        repository = 'localhost'
    } = req.body;

    let repo = new Repository(repository);
    let layers = new Layers(config.imagesLocation);
    let meta = {};

    try {

        meta = await repo.getMeta(image);

    } catch (error) {

        res.status(404)
        res.send(`Image "${image}" not found in the repository.`);
        return;

    }

    let parents = await repo.getParents(image);

    for (let i = 0; i < parents.length; i++) {

        let dep = parents[i];
        if (layers.has(dep.name)) continue;

        let meta = await repo.getMeta(dep.name);
        let archive = `/tmp/${meta.data.fileName}`;

        repo.downloadImage(dep.name, archive);
        let layer = layers.create(dep.name, dep.parent);
        await layer.decompress(archive);

    }

    let archive = `/tmp/${meta.data.fileName}`;
    let layer = layers.create(meta.data.name, meta.data.parent);

    repo.downloadImage(meta.data.name, archive);
    await layer.decompress(archive);

    res.send();

}
