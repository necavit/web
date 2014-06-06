/* **** **** **** **** **** **** **** **** **** **** */
/* author: necavit                                   */
/* **** **** **** **** **** **** **** **** **** **** */

/*
 * URL path based request router
 */

function route(handle, pathname, request, response) {
    console.log("Routing request for path: " + pathname);
    if (typeof handle[pathname] == 'function') {
        handle[pathname](request, response);
    } else {
        console.log("No request handler found for: " + pathname);
        handle["notFound"](request, response);
    }
}

exports.route = route;
