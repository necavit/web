# web-n-servers #

A repo for my own personal webpage &amp; server stuff.

## Overview ##
The environment deployed at [davidmr.es](http://davidmr.es) consists of a blogging engine called [Ghost](https://ghost.org), which runs on a [node.js](http://nodejs.org) server, and a couple of node.js servers running by themselves.

This environment is logically structured as follows:
* [davidmr.es](http://davidmr.es) points to a custom node.js server, being my personal web page.
* [blog.davidmr.es](http://blog.davidmr.es) points to the Ghost blogging engine.
* [hades.davidmr.es](http://hades.davidmr.es) is the development server for the Hades project (a game about geolocation &amp; zombies).

If you want to know more about those, please have a look at the corresponding directories. The `nginx` directory contains config files for the reverse proxy server that allows all other servers to run together.

## Subdomains, DNS and redirection ##
Because a single IP address is available (it is all running on the same hosted virtual machine), no DNS subdomain redirection is possible. This is, no DNS mapping can be done from subdomains to different TCP-level ports on the same machine, so different servers may be listening to those. Instead, all subdomains are pointing to the same IP address. This is achieved by setting these DNS records in the DNS zone configuration console:

```
davidmr.es.             A      127.0.0.1
*.davidmr.es.           CNAME  davidmr.es.
```

Of course, the IP address of the `A` record must match with the one that the server host provides.

Having all sudomains pointed at the same address, a reverse proxy server is needed to achieve the redirection desired. An [nginx](http://nginx.com) server is used, since it is very lightweight and certainly fast.

### nginx configuration
The nginx server is just an entry gate for all HTTP requests on the 80 port. It dispatches the requests to the desired subdomains as configured appropriately. See the `nginx` directory to know what is going on under the hood. The subdomains being redirected so far are:

* The [davidmr.es](http://davidmr.es) root domain, running on the 8080 port.
* The [blog.davidmr.es](http://blog.davidmr.es) blog subdomain, running on the 2369 port.
* The [hades.davidmr.es](http://hades.davidmr.es) server, running on the 5000 port.
