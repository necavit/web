var POLICY_ACCEPT_COOKIE_NAME = "dmresacceptpolicy";

function checkCookiePolicy() {
	var acceptPolicyCookie = $.cookie('dmresacceptpolicy');
	if (acceptPolicyCookie) {
		console.log('Cookie policy accepted. Enabling analytics.');
		alert('Enable Google Analytics');
	}
	else {
		console.log('Cookie policy not yet accepted. Prompting user for acceptance.');
		$('#cookie-policy-modal').openEnhancedModal({
			dismissable: false
		});
	}
}
