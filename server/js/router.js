/* **** **** **** **** **** **** **** **** **** **** */
/* author: necavit                                   */
/* **** **** **** **** **** **** **** **** **** **** */

/*
 * URL path based request router
 */

function route(handle, pathname) {
    console.log("Routing request for path: " + pathname);
    if (typeof handle[pathname] == 'function') {
        handle[pathname]();
    } else {
        console.log("No request handler found for: " + pathname);
    }
}

exports.route = route;
