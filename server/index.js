/* **** **** **** **** **** **** **** **** **** **** */
/* author: necavit                                   */
/* **** **** **** **** **** **** **** **** **** **** */

/*
 * Server bootstrap logic
 */

var server = require("./js/server");
var router = require("./js/router");
var handlers = require("./js/handlers/handlers.js");

var handle = {}
handle["/"] = handlers.home;
handle["notFound"] = handlers.notFound;

//start server, listening on the port provided and
// using the path router injected
server.start(8080, router.route, handle);
