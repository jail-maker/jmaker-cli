#!/usr/bin/env node

const fs = require('fs');
const yaml = require('js-yaml');

const CWD = process.cwd();

try {

    let buffer = fs.readFileSync(CWD + '/jmakefile.yml', 'utf8');
    let config = yaml.safeLoad(buffer);
    console.log(config);

} catch (e) {

    console.log(e);
    process.exit();

}

