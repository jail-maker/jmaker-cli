'use strict';

module.exports = code => {

    if(code < 200 || code >= 300) return true;
    return false;

}
