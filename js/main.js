/* Copyright (c) 2013 Dorian Scholz */
/* License: GPLv3 or later */
/*jslint browser: true */
/*global require */

require.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    },
    shim: {
        'jquery.tablesorter': ['jquery'],
        'jquery.easytabs': ['jquery', 'jquery.hashchange'],
        'jquery.hashchange': ['jquery'],
        'jquery.plugin': ['jquery'],
        'jquery.timer': ['jquery', 'jquery.plugin'],
        'jquery.jsonrpc': ['jquery']
    }
});

require(
    [
        'app/eiskaltdcpp',
        'app/eiskaltdcpp.debug',
        'app/eiskaltdcpp.status',
        'app/eiskaltdcpp.search',
        'app/eiskaltdcpp.queue'
    ],
    function (eiskaltdcpp) {
        'use strict';
        eiskaltdcpp.onLoad();
        eiskaltdcpp.status.onLoad();
        eiskaltdcpp.search.onLoad();
        eiskaltdcpp.queue.onLoad();
    }
);
