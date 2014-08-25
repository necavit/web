# Hades REST API #

This node.js app is a RESTful API providing a private service for Hades Soft's *humans vs zombies* mobile game.

The API is built upon a [Mongo](http://www.mongodb.org/)-[Express](http://expressjs.com/)-[Node](http://nodejs.org/) stack and uses [RAML](http://raml.org/) as the API modelling language and automated documentation engine.

## Authentication ##

Authentication is needed to access the Hades REST API documentation pages, through a valid username and password. The authentication module is located within the `index.js` file, under the `routes` directory.
