/* Copyright (c) 2013 Dorian Scholz */
/* Copyright (c) 2017 Boris Pek */
/* License: GPLv3 or later */
/*jslint browser: true */
/*global define */

define(
    ['jquery', 'app/eiskaltdcpp', 'config.js', 'app/eiskaltdcpp.queue', 'app/eiskaltdcpp.debug', 'jquery.tablesorter', 'jquery.timer'],

    function ($, eiskaltdcpp, config) {
        'use strict';

        var my = {
            searchTypes: {
                'Any': 0,
                'Audio': 1,
                'Compressed': 2,
                'Document': 3,
                'Executable': 4,
                'Picture': 5,
                'Video': 6,
                'Directory': 7,
                'TTH': 8,
                'CD image': 9
            },

            searchResults: {},
            groupedResults: {},

            clearSearchResults: function () {
                $.jsonRPC.request('search.clear', {
                    error : eiskaltdcpp.debug.onError
                });
                $('table#searchresults tbody > tr').remove();
                my.groupedResults = {};
                my.searchResults = {};
            },

            updateSearchResultIcon: function (tth) {
                var downloadLink, removeLink;
                downloadLink = $('#download_' + tth);
                removeLink = $('#remove_' + tth);
                if (eiskaltdcpp.queue.downloadQueueTTH.hasOwnProperty(tth)) {
                    downloadLink.hide();
                    removeLink.show();
                    removeLink.attr('target', eiskaltdcpp.queue.downloadQueueTTH[tth].data.Target);
                } else {
                    downloadLink.show();
                    removeLink.hide();
                }
            },

            getUserLink: function (result) {
                var image, url, userlink;
                image = 'images/web_search.png';
                url = 'https://duckduckgo.com/?q=%Filename%';
                userlink = '<a target="_blank" href="' + url + '"><img src="' + image + '">';
                var filter, re, matches;
                filter = function (text) {
                    return text.replace(/\.\w{2,}$/, '').replace(/[-._+]/g, ' ').replace(/\(.*\)/g, ' ').replace(/\[.*\]/g, ' ').replace(/\d{3,}.*/, '');
                }
                re = new RegExp(/%\w+%/gi);
                matches = userlink.match(re);
                if (matches !== null) {
                    $.each(matches, function (index, match) {
                        userlink = userlink.replace(match, filter(result[match.replace(/%/g, '')]));
                    });
                }
                return userlink;
            },

            getMagnetLink: function (result) {
                var image, url, magnetlink;
                image = 'images/magnet.png';
                url = 'magnet:?xt=urn:tree:tiger:' + result.TTH + '&xl=' + result['Real Size'] + '&dn=' + encodeURI(result.Filename);
                magnetlink = '<a target="_blank" href="' + url + '"><img src="' + image + '">';
                return magnetlink;
            },

            addSearchResult: function (result) {
                var table, row, tth, headers, downloadLink, downloadImage, removeLink, removeImage;
                table = $('table#searchresults');
                tth = result.TTH;
                if (!my.groupedResults.hasOwnProperty(tth)) {
                    row = $('<tr>');

                    downloadImage = $('<img src="images/download.png">');
                    downloadLink = $('<a id="download_' + tth + '" filename="' + result.Filename + '" tth="' + tth + '" size="' + result['Real Size'] + '">').append(downloadImage);
                    downloadLink.on('click', my.onDownloadClicked);

                    removeImage = $('<img src="images/remove.png">');
                    removeLink = $('<a id="remove_' + tth + '" target="">').append(removeImage);
                    removeLink.on('click', eiskaltdcpp.queue.onRemoveClicked);
                    removeLink.hide();

                    result.UserLink = my.getUserLink(result);
                    result.MagnetLink = my.getMagnetLink(result);
                    result.DownloadLink = downloadLink.add(removeLink);

                    headers = table.find('th');
                    headers.each(function (i, header) {
                        var key = $(header).attr('key');
                        if (key !== undefined) {
                            row.append($('<td key="' + key + '">').append(result[key]));
                        }
                    });
                    table.find('tbody').append(row);
                    my.groupedResults[tth] = {'row': row, 'results': []};
                    my.updateSearchResultIcon(tth);
                }
                my.groupedResults[tth].results.push(result);
                my.groupedResults[tth].row.find('td[key=UserCount]').text(my.groupedResults[tth].results.length);
            },

            updateSearchResults: function (data) {
                if (data.result === null) {
                    eiskaltdcpp.debug.print(eiskaltdcpp.debug.levels.INFO, 'search results: ' + data.result);
                } else {
                    data.result.forEach(function (result) {
                        var resultId = result.CID + result.TTH;
                        if (!my.searchResults.hasOwnProperty(resultId)) {
                            my.searchResults[resultId] = result;
                            my.addSearchResult(result);
                        }
                    });
                    $('table#searchresults').trigger('update');
                }
            },

            requestSearchResults: function () {
                $.jsonRPC.request('search.getresults', {
                    success : my.updateSearchResults,
                    error : eiskaltdcpp.debug.onError
                });
            },

            onSearchSendSuccess: function (data) {
                var searchIsValid = (data.result === 0);
                eiskaltdcpp.debug.print(eiskaltdcpp.debug.levels.DEBUG, 'searchIsValid: ' + searchIsValid);
                if (searchIsValid) {
                    $('input#searchstring').timer('start');
                }
            },

            onSearchClicked: function () {
                $('input#searchstring').timer('stop');
                my.clearSearchResults();
                $.jsonRPC.request('search.send', {
                    params : {
                        'searchstring': $('input#searchstring').val(),
                        'searchtype': Number($('#searchtype option:selected').val())
                    },
                    success : my.onSearchSendSuccess,
                    error : eiskaltdcpp.debug.onError
                });
            },

            onDownloadClicked: function () {
                // add file to the download queue
                $.jsonRPC.request('queue.add', {
                    params : {
                        'filename': $(this).attr('filename'),
                        'size': Number($(this).attr('size')),
                        'tth': $(this).attr('tth'),
                        'directory': ''
                    },
                    error : eiskaltdcpp.debug.onError
                });
                // start TTH search for the newly added file to get download sources
                $('input#searchstring').timer('stop');
                $.jsonRPC.request('search.send', {
                    params : {
                        'searchstring': $(this).attr('tth'),
                        'searchtype': Number(my.searchTypes.TTH)
                    },
                    error : eiskaltdcpp.debug.onError
                });
            },

            onLoad: function () {
                var searchString, searchType;

                $.each(my.searchTypes, function (typename, typeval) {
                    $('#searchtype').append(
                        $('<option></option>').val(typeval).html(typename)
                    );
                });

                // init table sorting and set initial sorting column by key
                $('table#searchresults').tablesorter();
                $('table#searchresults').find('th').each(function (i, header) {
                    if ($(header).attr('key') === 'UserCount') {
                        $('table#searchresults').trigger('sorton', [[[i, 1]]]);
                        return;
                    }
                });

                $('input#search').on('click', my.onSearchClicked);
                $('input#searchstring').keypress(function (event) {
                    if (event.which === 13) {
                        event.preventDefault();
                        my.onSearchClicked();
                        return false;
                    }
                });

                $('input#searchstring').timer({
                    callback: my.requestSearchResults,
                    delay: 500,
                    repeat: 50,
                    autostart: false
                });

                searchType = eiskaltdcpp.getURLParameter('searchtype');
                if (searchType !== null) {
                    $.each(my.searchTypes, function (typename, typeval) {
                        if (typename.toLowerCase() === String(searchType).toLowerCase()) {
                            $('#searchtype option[value="' + typeval + '"]').attr('selected', true);
                            return false;
                        }
                    });
                }

                searchString = eiskaltdcpp.getURLParameter('searchstring');
                if (searchString !== null) {
                    $('#tab-container').easytabs('select', '#tab-search');
                    $('input#searchstring').val(searchString);
                    my.onSearchClicked();
                }
            }
        };

        eiskaltdcpp.search = my;
        return my;
    }
);
