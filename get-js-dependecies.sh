#!/bin/sh

# Author:  Boris Pek <tehnick-8@yandex.ru>
# License: Public Domain
# Created: 2013-10-19
# Updated: 2017-10-06
# Version: N/A

# Dependencies: wget

set -e

[ -z "${MAIN_DIR}" ] && export MAIN_DIR="$(realpath -s $(dirname ${0}))"

cd "${MAIN_DIR}"
rm -rf js/lib
mkdir -p js/lib
cd js/lib

wget -nv -c https://code.jquery.com/jquery-1.12.4.min.js                                             -O jquery.js
wget -nv -c https://raw.github.com/JangoSteve/jQuery-EasyTabs/v3.2.0/lib/jquery.easytabs.min.js      -O jquery.easytabs.js
wget -nv -c https://raw.github.com/pandell/jquery-hashchange/v1.3c/jquery.ba-hashchange.min.js       -O jquery.hashchange.js
wget -nv -c https://raw.github.com/datagraph/jquery-jsonrpc/0.1.1/jquery.jsonrpc.js                  -O jquery.jsonrpc.js
wget -nv -c https://raw.github.com/Cyntax/jquery-timer/0.1.1/jquery.plugin.js                        -O jquery.plugin.js
wget -nv -c https://raw.github.com/Cyntax/jquery-timer/0.1.1/jquery.timer.js                         -O jquery.timer.js
wget -nv -c https://raw.github.com/Mottie/tablesorter/v2.29.0/dist/js/jquery.tablesorter.min.js      -O jquery.tablesorter.js
wget -nv -c http://requirejs.org/docs/release/2.3.5/minified/require.js                              -O require.js

