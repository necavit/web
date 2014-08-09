Where is this blog running? How is it set up? On top of which technology are this blog and the [davidmr.es](http://davidmr.es) webpage built? I'll try to explain it here with some code snippets and diagrams that may help make that clear.

Before I begin, it's been literally months since I started building this, so forgive me if I don't recall things well... Or if some explanation is poor or even misleading.

## The host ##

In the first place, since I wanted to have both a personal webpage and a place to write some articles (or at least try it!), I decided to register the *davidmr.es* domain. But no matter how you label it, you definitely need a machine to do the actual work.

All the web pages under the *davidmr.es* domain - the [personal one](http://davidmr.es) (which is yet under development and needs huge enhancements), this blog and some other non-public, personal projects - are running in a Ubuntu 14.04 virtual machine, hosted by [DigitalOcean](https://www.digitalocean.com/), which I found to be simple, clean, easy to manage and, over all, not very expensive.

Once the virtual machine instance was running and the domain had been registered, a simple DNS configuration (a pair of `A` and  `CNAME` records) was all that was needed to access "my new toy" from anywhere around. The one thing left to do now was setting up an environment capable of routing incoming requests by subdomain, this is, a request for `blog.davidmr.es` should be answered by a different running process than a request targeted at `davidmr.es`, for example.

This "subdomain redirection" was somehow tricky for me, because I had no previous knowledge on the topic. I spent some time believing that the DNS system had some kind of record to map a specific domain name to an IP address **and** a TCP port - foolish of me. I learnt then that *reverse proxies* are your friends in there. I decided to go on with [nginx](http://nginx.com), because it seemed easy to install, it is lightweight and has a low memory profile and, also, because it is [fast](www.aosabook.org/en/nginx.html).

## Nginx ##

I said nginx *seemed* easy to install, but for someone that had never had to struggle with it, it took quite some time to configure it correctly. In the end, it's just a matter of reading the docs over and over again, until you begin to grasp what they tell you.

There are some things which are important to keep in mind. On one hand, there is the file structure of the configuration files, located under the `/etc/nginx` directory:

```
/etc/nginx
 ├── sites-available
 │   ├── blog.davidmr.es
 │   └── default
 ├── sites-enabled
 │   └── blog.davidmr.es -> ../sites-available/blog.davidmr.es
 └── nginx.conf
```

This is what some of the files and directories here do:

* `sites-available` contains config files for every site, app, server or however you may call it, that you might deploy behind the nginx server.
* `sites-enabled` has symbolic links pointing to all the sites that you want to effectively enable. If you forget to create a link to the config file under the previous directory, your site will not be accessible from outside (nginx will not reverse-proxy it).
* `nginx.conf` is the main nginx configuration file, where global directives are set. For example, the number of requests nginx is able to serve is declared here.

*Please note that I ommitted many other files that, besides not being relevant now, I did not touch at all when configuring the server.*

Besides the file structure, the only thing you need to do when setting up an nginx server is writing those files that go on the `sites-available` directory. If you want to keep it simple, one such file can be as short as:

```
# IP address and port to listen to
upstream blog.davidmr.es {
    server <your.ip.address.here>:<your_site_port>;
}

# site configuration
server {
  # listen on the external <port> port
	listen <port>;

  # listen for requests on this (sub)domain
	server_name blog.davidmr.es;

  # redirect all requests on this path...
	location / {
    #... to the 'upstream' previously defined
		proxy_pass http://blog.davidmr.es;
	}
}
```

*Comment lines begin with the # character.*

Basically, the `upstream` element is the actual site you want nginx to proxy, which runs internally with a local IP address and TCP port. Then, on the `server` configuration element, you tell nginx to listen for incoming requests on a certain TCP port and under a certain domain name and redirect those requests to the upstream (`location`) you desire. For example, if the port under the `server` section is set to 80 (the standard HTTP port), when a browser sends an HTTP request for the `blog.davidmr.es` domain, nginx will route that request to a server which is listening to the IP address and port defined in the `upstream` element.

But having only one site running behind nginx makes no sense at all (we would not need nginx!). So, to run another one, you'll add its own new config file, like the one before, and you will add a symlink in the `sites-enabled` directory, pointing to that file. You will then restart nginx and, boom! It will crash. That's because you did not read the docs carefully, and you forgot to add the following directive to the `nginx.conf` file:

```
server_names_hash_bucket_size 64;
```

Once you add it, and restart nginx again, it will work like a charm. You can read about it in the [documentation](http://nginx.org/en/docs/http/server_names.html#optimization) (I don't feel like explaining it now).

And that is it! After some trouble finding what I needed in the documentation pages, I must confess that reverse-proxying multiple sites running on the same machine is quite easy with nginx. The following picture is an architectural overview of how the different sites under *davidmr.es* are finally set up behind the nginx server:

![davidmr.es deployment architecture]()

Keep reading to understand some of those other tiny boxes!

## node.js ##

I had not much previous experience in building neither static web pages nor complex, dynamic web servers (in the sense of a web application). I had been working for some time on an Apache Tomcat server, but I definitely did not want such a heavy system for my *really* simple project: building a personal page and, most of all, learn web-related technologies.

I decided to give [node.js](http://nodejs.org/) a try, for different reasons. Mainly, because everyone talks about it nowadays, but also because learning JavaScript was one of my current goals. Moreover, node.js is an event-driven web server, so a more *functional* approach is taken when developing node.js apps (it is not imperative programming).

The [davidmr.es](http://davidmr.es) page is a node.js web app. Even though it is simple and some could argue that a static HTML file could work as well, it is built using the [express.js](http://expressjs.com/) framework, which exposes a simple, yet powerful set of APIs to ease the node.js application development. *Routes*, *middleware* and *view engine* are some of the words I got used to after crafting the site. And, talking of view engines, I opted for [hogan-express](https://www.npmjs.org/package/hogan-express) to render my templates and organize the page layouts. It works with the logic-less [mustache](http://mustache.github.io/mustache.5.html) template language, and supports *partials*, which are very handy if I am to add some more pages to the site.

## Ghost ##

Finally, this blog, under the *blog.davidmr.es* domain, is run using the [Ghost](https://ghost.org/) blog engine, which is completely [ free and open source](https://ghost.org/pricing/), if you decide to host your own engine. It is also built on top of node.js and express.js, so posed to be a better alternative to a Wordpress blog, which is built with PHP, a language that I completely ignore. This way, if I ever want to hack anything from the Ghost core, it will be easier for me.

I have only made theme customisation for the Ghost engine so far, but it was quite easy to do. The [docs about it](http://docs.ghost.org/themes/#create-your-own) are pretty straightforward to understand and, moreover, my current theme design is forked from [Phantom](https://github.com/haydenbleasel/phantom), by [Hayden Bleasel](https://github.com/haydenbleasel), so I didn't have to start from scratch. I named the forked theme [phantom-necavit](https://github.com/necavit/phantom-necavit) and is opensourced and publicly available on GitHub.
