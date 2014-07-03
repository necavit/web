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


## Templates & public resources ##


