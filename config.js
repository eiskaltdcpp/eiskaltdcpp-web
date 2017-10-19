/*global define */
define([], function () {
    'use strict';
    return {
        "jsonrpc" : {
            "host" : "", // if empty it defaults to the host serving the script and falls back to localhost
            "port" : "3121"
        },
        "debugLevel" : 3
    };
});
