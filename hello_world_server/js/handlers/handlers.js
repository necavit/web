/* **** **** **** **** **** **** **** **** **** **** */
/* author: necavit                                   */
/* **** **** **** **** **** **** **** **** **** **** */

/*
 * Basic handling functions. Not really structured, but
 * it is deprecated from inception. In the future, some
 * nice node.js framework will replace all this, thus
 * not having to map directly handlers to URL paths.
 */

var fs = require("fs");

function home(request, response) {
    console.log("Home, sweet home!");
    fs.readFile(__dirname + "/../../html/home.html", function(error, data) {
        if (error) {
            throw error;
        }
        response.writeHeader(200, {"Content-Type":"text/html"});
        response.write(data);
        response.end();
    });
}

function notFound(request, response) {
    fs.readFile(__dirname + "/../../html/not_found.html", function(error, data) {
        if (error) {
            throw error;
        }
        response.writeHeader(404, {"Content-Type":"text/html"});
        response.write(data);
        response.end();
    });
}

exports.home = home;
exports.notFound = notFound;
