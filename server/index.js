/* **** **** **** **** **** **** **** **** **** **** */
/* author: necavit                                   */
/* **** **** **** **** **** **** **** **** **** **** */

/*
 * Server bootstrap logic
 */

var server = require("./js/server");
var router = require("./js/router");

//start server, listening on the port provided and
// using the path router injected
server.start(8080, router.route);
