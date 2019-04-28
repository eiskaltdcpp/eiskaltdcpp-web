# EiskaltDC++ Web UI

Official Web User Interface for [eiskaltdcpp-daemon](https://github.com/eiskaltdcpp/eiskaltdcpp). It is designed for using on embedded devices (for example in NAS) in your home network.

Features:

* Searching of files and directories
* List of current/queued downloads
* Status of connected hubs and basic statistics

## License

[GNU GPLv3 or later](https://github.com/eiskaltdcpp/eiskaltdcpp-web/blob/master/LICENSE)

Some files are distributed under other licenses, see [copyrights](https://github.com/eiskaltdcpp/eiskaltdcpp-web/blob/master/full.copyrights.info.in.Debian.style) file for details.

## Screenshots

<a href="https://tehnick.github.io/eiskaltdcpp/eiskaltdcpp-web_downloads.png" title="Downloads">
    <img src="https://tehnick.github.io/eiskaltdcpp/eiskaltdcpp-web_downloads.png" width="99%">
</a>

<a href="https://tehnick.github.io/eiskaltdcpp/eiskaltdcpp-web_search.png" title="Search">
    <img src="https://tehnick.github.io/eiskaltdcpp/eiskaltdcpp-web_search.png" width="99%">
</a>

<a href="https://tehnick.github.io/eiskaltdcpp/eiskaltdcpp-web_status.png" title="Status">
    <img src="https://tehnick.github.io/eiskaltdcpp/eiskaltdcpp-web_status.png" width="99%">
</a>

## Installation

See [INSTALL](https://github.com/eiskaltdcpp/eiskaltdcpp-web/blob/master/INSTALL) file.

## Contribution

* Patches are welcome!
* If you need to add extra library, then:
  * check the license of that library very carefully
  * check if that library is actively maintained (for fixing possible bugs in it)
  * copy only **source version** of javascript file into this repo (if you prefer using of minified versions of javascript files, you may generate them automatically during Web UI installation)

## Versions history

* 1.0 (2019-xx-xx):
  * First stable release.
  * Compatible with eiskaltdcpp-daemon 2.4.0.

