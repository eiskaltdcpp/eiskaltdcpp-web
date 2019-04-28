# EiskaltDC++ Web UI &ndash; Help for MS Windows users

## Local usage of Web UI

Open `index.html` file in any modern web browser which you like. For example, in Mozilla Firefox or Google Chrome.

Depending on your use case Web UI may need some configuration, see below.

### Example of launching daemon on local network interface

If you do not want to control `eiskaltdcpp-daemon` from remote PC and would like to be sure that remote control is disabled you should launch `eiskaltdcpp-daemon` like this:

```
eiskaltdcpp-daemon.exe -L 127.0.0.1 -d
```

In this case Web UI do not need extra configuration and you may use it as is.

### Example of launching daemon on specific network interface

If you set external IP address in command-line options of `eiskaltdcpp-daemon` like this:

```
eiskaltdcpp-daemon.exe -L 192.168.0.132 -d
```

than connections to `eiskaltdcpp-daemon` will be possible only via `192.168.0.132` IP address.

In this case connections via `127.0.0.1` will not work you should edit Web UI configuration file `config.js` in any modern text editor (for example, in `Notepad++`). Find value of `host` variable and change this string to something like this:

```
            "host" : "192.168.0.132",
```

Of course IP address will be different in your case. After saving of config file do not forget to reload page with Web UI in your web browser.

### Example of launching daemon on all available network interfaces

In this case launching command should look like this:

```
eiskaltdcpp-daemon.exe -L 0.0.0.0 -d
```

This is the less secure way of lauching `eiskaltdcpp-daemon`, becase it may be controlled from remote PC in your local network (or even from remote PC via Internet if you connected to Internet directly and have white IPv4 address) without notifying you.

## Remote usage of Web UI

You have to Google how to setup and configure web server in your system.

For example related part `nginx` config may look like this:

```
server {
    listen   80 default;
    listen   [::]:80 default;

    location / {
        root C:/eiskaltdcpp/web-ui;
        index index.html;
    }
}
```

Using IP address from example above Web UI should be available at: http://192.168.0.132/

