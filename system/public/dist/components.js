(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Add ECMA262-5 method binding if not supported natively
//
if (!('bind' in Function.prototype)) {
    Function.prototype.bind = function (owner) {
        var that = this;
        if (arguments.length <= 1) {
            return function () {
                return that.apply(owner, arguments);
            };
        } else {
            var args = Array.prototype.slice.call(arguments, 1);
            return function () {
                return that.apply(owner, arguments.length === 0 ? args : args.concat(Array.prototype.slice.call(arguments)));
            };
        }
    };
}

// Add ECMA262-5 string trim if not supported natively
//
if (!('trim' in String.prototype)) {
    String.prototype.trim = function () {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}

// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function (find, i /*opt*/) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf = function (find, i /*opt*/) {
        if (i === undefined) i = this.length - 1;
        if (i < 0) i += this.length;
        if (i > this.length - 1) i = this.length - 1;
        for (i++; i-- > 0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (action, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map = function (mapper, that /*opt*/) {
        var other = new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                other[i] = mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function (filter, that /*opt*/) {
        var other = [], v;
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && filter.call(that, v = this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}
},{}],2:[function(require,module,exports){
(function (cms, $) {
    'use strict';
    function initContentSettings() {
        $('#createSitemapLinkButton').click(function (event) {
            event.preventDefault();

            createSitemap();
        });
    }

    function createSitemap() {
        $.ajax({
            url: '/admin/contentsettings/createsitemap',
            timeout: 1000,
            type: 'POST',
            traditional: true,
            success: function (data) {
                if (data.success == true) {
                    alert('sitemap created');
                }
                else {
                    alert('error while creating sitemap');
                }
            },
            error: function (xhr) {
                alert('error while creating sitemap: ' + xhr);
            }
        });
    }

    cms.options = {
        initContentSettings: initContentSettings,
    };

} (window.cms = window.cms || {}, jQuery));   
},{}],3:[function(require,module,exports){
(function (cms, $) {
    'use strict';

    var enableTinyMCe;

    function init(tinyMce) {

        enableTinyMCe = tinyMce;

        registerClickHandlersOnAnchors();
    }

    function registerClickHandlersOnAnchors() {
        $('#uriBrowserTree li a').click(function () {
            var type = $(this).data('type');
            var navigateUrl = $(this).data('navigateurl');
            var inputId = $(this).data('inputid');

            uriSelected(type, navigateUrl, inputId);
        });
    }

    function uriSelected(type, url, inputId) {

        if (type == 'image' || type == 'file') {

            if (enableTinyMCe) {
                
                top.tinymce.activeEditor.windowManager.getParams().oninsert(url);
                top.tinymce.activeEditor.windowManager.close();
                
            } else {

                $("#" + inputId + "", window.opener.document).val(url);
                top.tinymce.activeEditor.windowManager.close();
            }
            
        }
    }

    cms.uriBrowser =  {
        init: init
    };
}(window.cms = window.cms || {}, jQuery));
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
(function(cms, $) {
    'use strict';

    var googleAnalyticsBusyIndicator;

    cms.home = {
        init: init,
        googleApiAuthorised: googleApiAuthorised
    };

    function init() {

        initControls();
    }

    function initControls() {
        googleAnalyticsBusyIndicator = $('#googleAnalyticsBusyIndicator');
    }

    function googleApiAuthorised(gaAccount, gaHistory) {

        googleAnalyticsBusyIndicator.show();

        var endDate = new Date().format("yyyy-mm-dd");

        var days = (24 * 60 * 60 * 1000) * gaHistory;
        var startDate = new Date();
        startDate.setTime(startDate.getTime() - days);
        startDate = startDate.format("yyyy-mm-dd");

        var apiQuery = gapi.client.analytics.data.ga.get({
            'ids': 'ga:' + gaAccount,
            'start-date': startDate,
            'end-date': endDate,
            'dimensions': 'ga:date',
            'metrics': 'ga:visits',
            'max-results': 50
        });

        apiQuery.execute(printResults);
    }
    
    function printResults(results) {

        googleAnalyticsBusyIndicator.hide();

        var googleAnalyticsResult = document.getElementById('googleAnalyticsResult');

        if (results.rows && results.rows.length) {

            var chartData = getVisitorChartData(results);

            new google.visualization.AreaChart(googleAnalyticsResult).
            draw(chartData.data, {
                curveType: "none",
                width: googleAnalyticsResult.clientWidth -20, height: 150, // 20px is the offset of the padding of the fluid-container
                vAxis: {
                    maxValue: chartData.maxVisits,
                    minValue: 0,
                    gridlines: { color: '#ccc', count: 1 },
                },
                hAxis: {
                    showTextEvery: 3,
                    textStyle: { fontSize: 10 },
                    slantedTextAngle: 45
                },
                series: [{ color: 'blue', areaOpacity: 0.20 }, { areaOpacity: 0 }]
            }
            );
        }
        else {
            googleAnalyticsResult.innerHtml = "no google analytics result found!";
        }
    }

    function getVisitorChartData(result) {
        var arrayNumber = 0;
        var rows = result.rows;
        var arrayOfData = new Array(rows.length);
        var maxVisits = 0;
        var avg = 0, total = 0;

        for (var j = 0; j < rows.length; j++) {
            total = total + parseInt(rows[j][1], 10);
        }
        avg = total / rows.length;

        arrayOfData[arrayNumber] = new Array(3);
        arrayOfData[arrayNumber][0] = 'x';
        arrayOfData[arrayNumber][1] = 'Visits';
        arrayOfData[arrayNumber][2] = 'avg.';

        for (var i = 0; i < rows.length; i++) {

            arrayNumber++;
            arrayOfData[arrayNumber] = new Array(2);

            var row = rows[i];
            var day = row[0];
            var numVisits = parseInt(row[1], 10);

            var dayPart = day.substring(6, 8);
            var monthPart = day.substring(4, 6);
            var yearPart = day.substring(0, 4);

            var formattedDate = dayPart + '-' + monthPart + '-' + yearPart;

            arrayOfData[arrayNumber][0] = formattedDate;
            arrayOfData[arrayNumber][1] = numVisits;
            arrayOfData[arrayNumber][2] = avg;

            if (numVisits >= maxVisits) {
                maxVisits = numVisits;
            }
        }

        return {
            maxVisits: maxVisits,
            data: google.visualization.arrayToDataTable(arrayOfData)
        };
    }

}(window.cms = window.cms || { }, jQuery));
},{}],6:[function(require,module,exports){
var angular = require('_angular');
var angular = require('_angular-resource');

var modules = ['sharedmodule', 'services', 'filters'];//.concat(widgetModules);

angular.module('dashboardApp', modules)
    .controller('dashboardController', function($scope, logsService){
        $scope.showLogMessagesLoader = true;
        
        logsService.query({ limit: 5 }).$promise.then(function(data){
            $scope.latestLogMessages = data;
            $scope.showLogMessagesLoader = false;
        });
    })
    .directive('contentStats', function(){
        return {
          restrict: 'E',
          controller: function($scope, $http){
            
            $scope.showBusyIndicator = true;

            $http.get('/admin/api/dashboard/getcontentstats').then(function(result){
                $scope.showBusyIndicator = false;
                $scope.contentstats = result.data;
            });
          },
          template: '<div class="busy" ng-show="showBusyIndicator"></div>' +
                    '<div class="contentstats">' +
                        '<h5 ng-repeat="stat in contentstats"><span class="label label-primary">{{ stat.count }}</span>' +
                        '<a href="{{ stat.url }}">{{ stat.resourcekey | __  }}</a></h5>' +
                    '</div>'      
        };
    });
    
},{"_angular":undefined,"_angular-resource":undefined}],7:[function(require,module,exports){
angular.module('cms.focus', [])
    //
    // Directive that registers a focus on an element 
    //
    .directive('uiFocus', [function () {
    	return {
    		restrict: 'A',
    		link: function (scope, elm) {
    			elm.focus();
    		}
    	};
    }])
},{}],8:[function(require,module,exports){

angular.module('cms.growlers', [])
    //
    // Directive that shows a growl message when a error messaged is pushed to 
    //
    .directive('uiGrowler', ["notificationService", function(notificationService) {
        return {
            restrict: 'A',
            controller: function ($scope, $element, $attrs) {

                notificationService.addListener(showErrorMessages, 'error');

                notificationService.addListener(showSuccessMessages, 'success');

                function showSuccessMessages(message) {
                    showGrowl('success', message);
                }

                function showErrorMessages(message) {
                    showGrowl('error', message);
                }
            }
        };
    }])
},{}],9:[function(require,module,exports){

angular.module('cms.ichecker', [])
    //
    // This directive is needed to make the icheck plugin work in angularjs enabled forms
    //
    .directive('uiIchecker', function() {
        return {
            restrict: 'A',
            scope: {
                isSelected: '@selectedproperty',
                localModel: '=ngModel'
            },
            link: function (scope, elm) {

                setTimeout(function () {
                    var originalCheckbox = $(elm);

                    if (scope.isSelected === "true") {
                        originalCheckbox.attr('checked', 'checked');
                    }

                    originalCheckbox.iCheck({
                        checkboxClass: 'icheckbox_flat-aero',
                        radioClass: 'iradio_flat-aero'
                    });

                    originalCheckbox.on('ifChecked', function() {

                        scope.$apply(function () {
                            scope.localModel = true;
                        });
                    });

                    originalCheckbox.on('ifUnchecked', function() {

                        scope.$apply(function () {
                            scope.localModel = false;
                        });
                    });
                });
            }
        };
    });
},{}],10:[function(require,module,exports){
/**
 * Binds a TinyMCE widget to <textarea> elements.
 * Downloaded from: https://github.com/angular-ui/ui-tinymce/blob/master/src/tinymce.js
 * and changed a bit by adding default tinymce behaviour
 */
angular.module('ui.tinymce', [])
    .value('uiTinymceConfig', {})
    .directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
        uiTinymceConfig = uiTinymceConfig || {};
        var generatedIds = 0;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ngModel) {
                var expression, options, tinyInstance,
                    updateView = function() {
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    };
                // generate an ID if not present
                if (!attrs.id) {
                    attrs.$set('id', 'uiTinymce' + generatedIds++);
                }

                if (attrs.uiTinymce) {
                    expression = scope.$eval(attrs.uiTinymce);
                } else {
                    expression = {};
                }
                options = {
                    // Update model when calling setContent (such as from the source editor popup)
                    setup: function(ed) {
                        var args;
                        ed.on('init', function(args) {
                            ngModel.$render();
                        });
                        // Update model on button click
                        ed.on('ExecCommand', function(e) {
                            ed.save();
                            updateView();
                        });
                        // Update model on keypress
                        ed.on('KeyUp', function(e) {
                            ed.save();
                            updateView();
                        });
                        // Update model on change, i.e. copy/pasted text, plugins altering content
                        ed.on('SetContent', function(e) {
                            if (!e.initial) {
                                ed.save();
                                updateView();
                            }
                        });
                        if (expression.setup) {
                            scope.$eval(expression.setup);
                            delete expression.setup;
                        }
                    },
                    mode: 'exact',
                    elements: attrs.id
                };
                // extend options with initial uiTinymceConfig and options from directive attribute value
                angular.extend(options, uiTinymceConfig, expression);
                setTimeout(function() {
                    tinymce.init(options);
                });


                ngModel.$render = function() {
                    if (!tinyInstance) {
                        tinyInstance = tinymce.get(attrs.id);
                    }
                    if (tinyInstance) {
                        tinyInstance.setContent(ngModel.$viewValue || '');
                    }
                };
            }
        };
    }]);
},{}],11:[function(require,module,exports){
/**
 * creates a jquery fileupload
 */
angular.module('ui.upload', [])
    .directive('uiUpload', [function () {
        var generatedIds = 0;
        return {

            link: function(scope, elm, attr) {
                var options;

                if (attr.uiUpload) {
                    options = scope.$eval(attr.uiUpload);
                } else {
                    options = {};
                }

                if (!attr.id) {
                    attr.$set('id', 'uiUpload' + generatedIds++);
                }

                $('#fileupload').fileupload(options);
            }
        };
    }]);
},{}],12:[function(require,module,exports){
angular.module('logsApp', ['services', 'ngResource', 'sharedmodule'])
.controller('logsController', ['$scope', 'logsService',
    function ($scope, logsService) {

        $scope.logs = logsService.query({ limit: 75 });
    }]);
},{}],13:[function(require,module,exports){
angular.module('mainSettingsApp', ['services', 'cms.growlers', 
	'ngResource', 'sharedmodule', 'httpRequestInterceptors'])

    .value('settingKeys', ['website_mainurl', 'website_title', 'email_address', 'mainaddress']);
},{}],14:[function(require,module,exports){
angular.module("httpRequestInterceptors", [])

.config(['$httpProvider', function ($httpProvider) {
    
    $httpProvider.interceptors.push(function($q, notificationService){
        
        return {
                'responseError': function (response) {

                    if (response.data.UnhandledExceptionMessage) {
                        notificationService.addErrorMessage(response.data.UnhandledExceptionMessage);
                    }

                    if (response.data.RuleViolationExceptions) {

                        for (var i = 0; i < response.data.RuleViolationExceptions.length; i++) {
                            notificationService.addErrorMessage(response.data.RuleViolationExceptions[i]);
                        }
                    }

                    return $q.reject(response);
                }
            };
    });
 }]);
},{}],15:[function(require,module,exports){
angular.module('services', ['ngResource'])

	.factory('logsService', ['$resource', function ($resource) {
	    return $resource('/admin/api/logs');
	}])

	.factory('settingsService', ['$http', function ($http) {

	    return {
	        findByKeys: function (keys) {

	            var keysData = '';

	            for (var i = 0; i < keys.length; i++) {
	                if (i === 0) {
	                    keysData = '?keys=' + keys[i];
	                } else {
	                    keysData += '&keys=' + keys[i];
	                }
	            }

	            return $http.get('/admin/api/settings/' + keysData);
	        },
	        saveSettings: function (keyValues) {

	            var data = JSON.stringify(keyValues);

	            return $http.post('/admin/api/settings', data);
	        }
	    };
	}])

	.factory('uploadsService', ["$http", function ($http) {
	    return {
	        getFolderContents: function(path) {

	            return $http({
	                method: 'GET',
	                url: '/admin/api/uploadmanagement/getfoldercontents' + createQueryStringFromPath(path)
	            });
	        },
	        deleteFile: function(path, fileName) {

	            var pathQueryString = createQueryStringFromPath(path);

	            return $http({
	                method: 'DELETE',
	                url: '/admin/api/uploadmanagement/deletefile{0}filename={1}'.format(pathQueryString, fileName)
	            });
	        },
	        deleteFolder: function(path, folderName) {
	            
	            var pathQueryString = createQueryStringFromPath(path);
	            
	            return $http({
	                method: 'DELETE',
	                url: '/admin/api/uploadmanagement/deletefolder{0}foldername={1}'.format(pathQueryString, folderName)
	            });
	        },
	        createFolder: function (path, folderName) {

	            var pathQueryString = createQueryStringFromPath(path);

	            return $http({
	                method: 'POST',
	                url: '/admin/api/uploadmanagement/createfolder{0}foldername={1}'.format(pathQueryString, folderName)
	            });
	        }
	    };
    
	    function createQueryStringFromPath(path) {
	        var queryString = '?';

	        for (var i = 0; i < path.length; i++) {
	            if (i === 0) {
	                queryString = '?folders=' + path[i] + '&';
	            } else {
	                queryString += 'folders=' + path[i] + '&';
	            }
	        }

	        return queryString;
	    }
	}])
	
	.factory('notificationService', ['$rootScope', function($rootScope) {
	    var listeners = [];

	    $rootScope.$on("$routeChangeStart", function() {
	        listeners = [];
	    });

	    return {
	        addErrorMessage: function(message) {
	            for (var i = 0; i < listeners.length; i++) {

	                if (listeners[i].messageType === 'error') {
	                    listeners[i].handler(message);
	                }
	            }
	        },
	        addSuccessMessage: function(message) {
	            for (var i = 0; i < listeners.length; i++) {

	                if (listeners[i].messageType === 'success') {
	                    listeners[i].handler(message);
	                }
	            }
	        },

	        addListener: function(func, messageType) {
	            listeners.push({ handler: func, messageType: messageType });
	        }
	    };
	}]);
},{}],16:[function(require,module,exports){
function showGrowl(type, message) {

    if(message === undefined) {
        message = "an error occured!";
    }

    if (type === 'success') {
        $.growl.notice({
            title: cms.adminResources.get('ADMIN_GROWL_TITLE_SUCCESS'),
            message: message
        });
    }

    if (type === 'error') {
        $.growl.error({
            title: cms.adminResources.get('ADMIN_GROWL_TITLE_ERROR'),
            message: message
        });
    }
}


},{}],17:[function(require,module,exports){
var angular = require('_angular');

angular.module('filters', [])
	.filter('__', function() {
        return function(input, args) {
            return cms.adminResources.get(input, args);
        }
    });
},{"_angular":undefined}],18:[function(require,module,exports){
'use strict';

// Add ECMA262-5 method binding if not supported natively
//
if (!('bind' in Function.prototype)) {
    Function.prototype.bind = function (owner) {
        var that = this;
        if (arguments.length <= 1) {
            return function () {
                return that.apply(owner, arguments);
            };
        } else {
            var args = Array.prototype.slice.call(arguments, 1);
            return function () {
                return that.apply(owner, arguments.length === 0 ? args : args.concat(Array.prototype.slice.call(arguments)));
            };
        }
    };
}

// Add ECMA262-5 string trim if not supported natively
//
if (!('trim' in String.prototype)) {
    String.prototype.trim = function () {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}

// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function (find, i /*opt*/) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf = function (find, i /*opt*/) {
        if (i === undefined) i = this.length - 1;
        if (i < 0) i += this.length;
        if (i > this.length - 1) i = this.length - 1;
        for (i++; i-- > 0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (action, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map = function (mapper, that /*opt*/) {
        var other = new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                other[i] = mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function (filter, that /*opt*/) {
        var other = [], v;
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && filter.call(that, v = this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
    });
};
},{}],19:[function(require,module,exports){
angular.module('sharedmodule', [])
.controller("maincontroller", function($scope, $http, $window){
	$scope.logout = function () {
        
    	$http({ method: 'POST',
                url: '/admin/api/logout'
            })
    		.then(function() {
            	$window.location.href = '/admin';
        	});
    }
})
.controller('settingsController', function($scope, $parse, settingsService, 
       settingKeys, notificationService){

    function retrieveAndBindScopeVariables() {

        settingsService.findByKeys(settingKeys).then(function(result) {

            for (var i = 0; i < result.data.length; i++) {

                (function(keyValue) {

                    $parse('settings.' + keyValue.key).assign($scope, keyValue.value);

                })(result.data[i]);
            }
        });
    }

    retrieveAndBindScopeVariables();
    
	$scope.saveButtonClicked = function () {
            var keyValues = [];

            for (var i = 0; i < settingKeys.length; i++) {
                
                var key = settingKeys[i];
                var value = $parse('settings.' + key)($scope);

                keyValues.push({ key: key, value: value });
            }

            settingsService.saveSettings(keyValues).then(function(){
            	 notificationService.addSuccessMessage(cms.adminResources.get("ADMIN_SETTINGS_NOTIFY_SETTINGSSAVED"));
            });
        };
});;

},{}],20:[function(require,module,exports){
cms = window.cms || {};

cms.uploadsApp = angular.module('uploadsApp', ['cms.growlers', 'ui.upload', 'services']).
    config(['$httpProvider', function($httpProvider) {

        $httpProvider.responseInterceptors.push('httpInterceptor');
    }]);
},{}],21:[function(require,module,exports){
cms.uploadsApp.controller('uploadsController', [
    '$scope', 'notificationService', '$http', 'uploadsService',
    function($scope, notificationService, $http, uploadsService) {

        $scope.folders = [];
        $scope.createFolderName = '';
        $scope.uploadConfig = {
            url: '/admin/api/uploadmanagement/uploadfiles',
            dataType: 'json',
            dropZone: $('#dropzone'),
            complete: function(xhr) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (xhr.status == 200) {
                        notificationService.addSuccessMessage(cms.adminResources.get("UPLOADS_NOTIFY_FILEUPLOADED"));
                        retrieveFolderContents();

                    } else {
                        notificationService.addErrorMessage(cms.adminResources.get("UPLOADS_NOTIFY_FILENOTUPLOADED"));
                    }
                }
            },
            start: function() {
                updateProgress(0);
            },
            progressall: function(e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                updateProgress(progress);
            },
            submit: function(e, data) {
                data.formData = { 'folders[]': JSON.stringify($scope.folders) };
            }
        };

        $scope.createFolder = function() {

            uploadsService.createFolder($scope.folders, $scope.createFolderName).success(function() {
                retrieveFolderContents();
                notificationService.addSuccessMessage(cms.adminResources.get("UPLOADS_NOTIFY_FOLDERCREATED", $scope.createFolderName));
                $scope.createFolderName = '';
            });

        };

        $scope.openFolder = function(folder) {
            $scope.folders.push(folder);
            retrieveFolderContents();

            return false;
        };

        $scope.deleteFolder = function(folderName) {

            if (confirm(cms.adminResources.get("UPLOADS_NOTIFY_DELETEFOLDER", folderName))) {
                uploadsService.deleteFolder($scope.folders, folderName).success(function() {
                    retrieveFolderContents();

                    notificationService.addSuccessMessage(cms.adminResources.get("UPLOADS_NOTIFY_FOLDERDELETED", folderName));
                });
            }
        };

        $scope.deleteFile = function(fileName) {

            if (confirm(cms.adminResources.get("UPLOADS_NOTIFY_DELETEFILE", fileName))) {
                uploadsService.deleteFile($scope.folders, fileName).success(function() {
                    retrieveFolderContents();
                    notificationService.addSuccessMessage(cms.adminResources.get("UPLOADS_NOTIFY_FILEDELETED", fileName));
                });
            }
        };

        $scope.gotoFolder = function(folder) {

            var index = $scope.folders.indexOf(folder);
            var length = $scope.folders.length - index;

            if (index !== -1) {
                $scope.folders.splice(index, length, folder);
            } else {
                $scope.folders = [];
            }

            retrieveFolderContents();
        };

        function updateProgress(percentage) {
            $scope.uploadProgress = percentage + '%';

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            console.log('upload progress: ' + $scope.uploadProgress);
        }

        function retrieveFolderContents() {
            uploadsService.getFolderContents($scope.folders).success(function(data) {

                $scope.folderContent = data;
            });
        }

        retrieveFolderContents();

        updateProgress(0);
    }
]);
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]);
