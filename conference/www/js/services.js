(function(){
	'use strict';
angular.module('conference.services', ['ngResource'])

.factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
})

.factory('Speaker', function ($resource) {
    return $resource('http://localhost:5000/speakers/:speakerId');
});
})();