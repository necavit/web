
var POLICY_ACCEPT_COOKIE_NAME = "dmresacceptpolicy";
var EXPIRATION_VALUE = 365; //one year of expiration

function clearCookies() {
	console.log('Clearing all cookies.');
	var cookies = document.cookie.split(";");
	for(var i=0; i < cookies.length; i++) {
	    var equals = cookies[i].indexOf("=");
	    var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
	    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}

function setCookiePolicyCookie(value) {
	$.cookie(POLICY_ACCEPT_COOKIE_NAME, value, {expires: EXPIRATION_VALUE});
}

function acceptCookiePolicy() {
	console.log('Cookie policy accepted.');
	setCookiePolicyCookie('true');
	enableAnalytics();
	addDisqusComments();
}

function rejectCookiePolicy() {
	console.log('Cookie policy rejected.');
	clearCookies();
	setCookiePolicyCookie('false');
	disableAnalytics();
}

function initCookiePolicyModal() {
	$('#cookie-policy-modal-accept').click(function() {
		acceptCookiePolicy();
	});
	$('#cookie-policy-modal-reject').click(function() {
		rejectCookiePolicy();
	});
}

function checkCookiePolicy() {

	initCookiePolicyModal();

	var acceptCookies = $.cookie(POLICY_ACCEPT_COOKIE_NAME, JSON.parse);
	if (typeof acceptCookies !== 'undefined') {
		console.log('Cookie policy set with value: ' + acceptCookies);
		if (acceptCookies) {
			enableAnalytics();
			addDisqusComments();
		}
		else {
			disableAnalytics();
		}
	}
	else {
		console.log('Cookie policy not yet accepted. Prompting user for acceptance.');
		$('#cookie-policy-modal').openEnhancedModal({
			dismissable: false
		});
	}
}

/* **** **** **** **** **** **** **** **** **** **** **** */
/*     DISQUS COMMENTS                                    */
/* **** **** **** **** **** **** **** **** **** **** **** */

function addDisqusComments() {
	console.log('Enabling Disqus comments.');
	var disqusContainer = $('.disqus-comments-container');
	var disqusEngineScript = $("<script src='/js/disqus/disqus.js'></script>");
	var disqusThread = $('<div id="disqus_thread"></div>');
	disqusContainer.append(disqusThread);
	disqusContainer.append(disqusEngineScript);
}


/* **** **** **** **** **** **** **** **** **** **** **** */
/*     GOOGLE ANALYTICS                                   */
/* **** **** **** **** **** **** **** **** **** **** **** */

function enableAnalytics() {
	console.log('Enabling analytics.');
	window[disableStr] = false;
	_gaq.push(['_trackPageview']);
}

function disableAnalytics() {
	console.log('Disabling analytics.');
	window[disableStr] = true;
}

var GA_PROPERTY = 'UA-58097435-1';

// disable tracking by default
var disableStr = 'ga-disable-' + GA_PROPERTY;
window[disableStr] = true;

// analytics setup
var _gaq = _gaq || [];
_gaq.push(['_setAccount', GA_PROPERTY]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
            '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
