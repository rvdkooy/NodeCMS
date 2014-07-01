(function (cms) {
    'use strict';
    
    var _clientId, _gaAccount, _gaHistory, googleLoginButton, callBackFunction;
    var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

    function init(gaAccount, gaHistory, callBack) {

        _gaAccount = gaAccount;
        _gaHistory = gaHistory;
        googleLoginButton = document.getElementById('googlelogin-button');
        callBackFunction = callBack;
    }

    function handleClientLoad(apiKey, clientId) {
        _clientId = clientId;
        gapi.client.setApiKey(apiKey);

        window.setTimeout(checkAuth, 1);
    }

    function checkAuth() {
        // Call the Google Accounts Service to determine the current user's auth status.
        gapi.auth.authorize({ client_id: _clientId, scope: scopes, immediate: true }, handleAuthResult);
    }

    function handleAuthResult(authResult) {
        if (authResult) {
            loadAnalyticsClient();
        } else {
            handleUnAuthorized();
        }
    }

    function loadAnalyticsClient() {
        // Load the Analytics client and set handleAuthorized as the callback function
        gapi.client.load('analytics', 'v3', handleAuthorized);
    }

    function handleAuthorized() {
        googleLoginButton.style.visibility = 'hidden';
        callBackFunction(_gaAccount, _gaHistory);
    }

    // Unauthorized user
    function handleUnAuthorized() {
        googleLoginButton.style.visibility = '';
        googleLoginButton.onclick = handleAuthClick;
    }

    function handleAuthClick(event) {
        gapi.auth.authorize({ client_id: _clientId, scope: scopes, immediate: false }, handleAuthResult);
        return false;
    }

    cms.googleAnalyticsAuthorisation = {
        handleClientLoad: handleClientLoad,
        init: init
    };

}(window.cms = window.cms || {}));