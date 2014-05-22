/* **** **** **** **** **** **** **** **** **** **** */
/* author: necavit                                   */
/* **** **** **** **** **** **** **** **** **** **** */

/*
 * Primary server setup code
 */

var http = require("http");
var url = require("url");

function start(port, route, handle) {
    //callback method that will be called upon request receival
    function onRequest(request, response) {
      console.log("Request received.");
      //extract the pathname of the request (after the domain and
      //  before the request query)
      var pathname = url.parse(request.url).pathname;
      route(handle, pathname);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello World");
      response.end();
    }
    //server instance creation and initialization on port
    // received as a parameter
    http.createServer(onRequest).listen(port);
    console.log("Server started and running. Listening on port: " + port);
}

//exports a 'start' object (a function), being this file start function
exports.start = start;
