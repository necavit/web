/* **** **** **** **** **** **** **** **** **** **** */
/* author: necavit                                   */
/* **** **** **** **** **** **** **** **** **** **** */

/*
 * Basic handling functions. Not really structured, but
 * it is deprecated from inception. In the future, some
 * nice node.js framework will replace all this, thus
 * not having to map directly handlers to URL paths.
 */

function home() {
    console.log("Home, sweet home!");
}

exports.home = home;
