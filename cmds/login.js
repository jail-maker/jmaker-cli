
exports.command = ['login'];
exports.desc = 'login in the remote repository';

exports.builder = {

    u: {
        alias: 'user',
        demandOption: true,
        default: 'user',
        describe: 'user name',
        type: 'string'
    },
    p: {
        alias: 'password',
        demandOption: true,
        describe: 'password string',
        type: 'string',
    },

}

exports.handler = yargs => {

    console.log(yargs);

}
