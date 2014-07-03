# [davidmr.es](http://davidmr.es) node.js server #

This is the root folder containing a node.js server which serves mostly static pages on the *davidmr.es* root domain. It is a personal webpage and a very simple node.js app.

**Express.js** is the chosen lightweight web-app framework, providing us a lot of rounting capabilities and some very useful middleware.

**hogan-express** is the chosen templating library, allowing us to use server-side HTML inclusion and many other logic-less templating features.

All the node.js app dependencies can be found in the `package.json` file.


## Deployment and setup ##

Firstly, given this simple server is to be run behind an **nginx** reverse proxy server, the app has to enable support for it. This is done in the `app.js` file, in which the server application configuration is built. More specifically, the following line(s) has to be added in order to enable reverse-proxy support:

```javascript
//express app creation
var app = express();

//enabling reverse-proxy support
app.enable('trust proxy');
```

The final server creation is performed in the `bin/davidmr_es` file, which imports the `app.js` configuration file and boots a node.js server on the specified port. This `davidmr_es` file is intended to be used by an external script or program, such as **nodemon** or **forever**:

- [nodemon](https://github.com/remy/nodemon) is an *npm* package used to monitor file structure changes during node.js app development. It restarts the server every time a file is saved, so changes can automatically be checked in the browser.

- [forever](https://github.com/nodejitsu/forever) is another *npm* package used to run node.js servers indefinitely on production environments. When the server crashes, forever brings it up again.

The one-line `start-nodemon` script, in the **scripts** folder, can be used to run the server in development environments.


## Templates & Hogan view engine ##

[hogan-express](https://github.com/vol4ok/hogan-express)) is a wrapper around [hogan.js](https://github.com/twitter/hogan.js) to enable it for Express.js applications. It uses the [Mustache](http://mustache.github.io/mustache.5.html) template engine to allow the server render more complex page layouts without the need to re-write whole sections of them.

To enable the use of hogan-express in the app, it has to be added as a dependency in the `package.json` file and the following lines have to be added in the `app.js` configuration file:

```javascript
app.set('views', path.join(__dirname, 'templates'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
```

In this node.js app, there is a globally defined layout, which all pages share, found at `templates/layout/default.hmtl`. The `<head>` element for all the pages is defined there and a simple layout is used across all pages:

```html
...
<body>
  <!-- Header template inclusion -->
  {{> header }}

  <!-- Body (content) template inclusion -->
  {{{ yield }}}

  <!-- Footer template inclusion -->
  {{> footer }}
</body>
...
```

This means that all pages will have a common header and a footer layout. The `{{{ yield }}}` tag is used by request handlers to render the concrete page body content.

In order to have the header and footer templates available globally for all requests, the following lines are required in the `app.js` file:

```javascript
  //default partials (and layout) definition
app.set('layout', 'layout/default'); //all views will be wrapped by this layout
app.set('partials', {header: 'includes/header',
                     footer: 'includes/footer'});
```

Then, to render the home page, for example, the request handler should be as follows:

```javascript
router.get('/', function(req, res) {
  res.render('home', {});
});
```
