(function(){
	'use strict';
angular.module('conference.controllers', ['conference.services', 'ngOpenFB'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, ngFB) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  


  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
};
})


.controller('ProfileCtrl', function ($scope, ngFB) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });
})


.controller('SessionsCtrl', function ($scope, Session) {
    $scope.sessions = Session.query();
})





.controller('SessionCtrl', function ($scope, $state, $stateParams, Session, ngFB) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
    $scope.share = function (event) {
    ngFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "I'll be attending: '" + $scope.session.title + "' by " +
            $scope.session.speaker
        }
    }).then(
        function () {
            alert('The session was shared on Facebook');
        },
        function () {
            alert('An error occurred while sharing this session on Facebook');
        });
    }
    $scope.sessionLocation = function (event) {
      $state.go("app.location", { id: $scope.session.id });
    }
})





.controller('LocationMapCtrl', function ($stateParams, Session){
  var vm = this;
        
        vm.locationId = Number($stateParams.id);

        vm.map = {
            center: {
                latitude: 28.613939,
                longitude: 77.209021,
            },
            zoom: 12
        };
        vm.marker = { }

       
//vm.session = Session.get({sessionId: $stateParams.sessionId});
           
           /* vm.marker = {
                latitude: vm.session.latitude,
                longitude: vm.session.longitude,
                title: vm.sessionlocation + "<br/>(Tap for directions)",
                showWindow: true
            };
*/
          /*  vm.map.center.latitude = vm.session.latitude;
            vm.map.center.longitude = vm.session.longitude;*/
        
/*
        vm.locationClicked = function(marker){
            window.location = "geo:" + marker.latitude + "," + marker.longitude + ";u=35";
        };*/

    })

.controller('SpeakersCtrl', function($scope, Speaker) {
    $scope.speakers = Speaker.query();
})



.controller('SpeakerCtrl', function ($scope, $stateParams, Speaker, ngFB) {
    $scope.speaker = Speaker.get({speakerId: $stateParams.speakerId});
    $scope.share = function (event) {
    ngFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "I'll be attending a session by: '" + $scope.speaker.name 
        }
    }).then(
        function () {
            alert('The session was shared on Facebook');
        },
        function () {
            alert('An error occurred while sharing this session on Facebook');
        });
};
});

})();