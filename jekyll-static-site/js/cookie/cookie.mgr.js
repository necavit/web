var POLICY_ACCEPT_COOKIE_NAME = "dmresacceptpolicy";

function acceptCookiePolicy() {
	console.log('Cookie policy accepted.');
	$.cookie(POLICY_ACCEPT_COOKIE_NAME, 'true');
}

function rejectCookiePolicy() {
	console.log('Cookie policy rejected.');
	$.cookie(POLICY_ACCEPT_COOKIE_NAME, 'false');
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
			console.log('Enabling analytics.');
		}
		else {
			console.log('Disabling analytics.');
		}
	}
	else {
		console.log('Cookie policy not yet accepted. Prompting user for acceptance.');
		$('#cookie-policy-modal').openEnhancedModal({
			dismissable: false
		});
	}
}
