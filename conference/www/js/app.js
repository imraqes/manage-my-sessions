app = angular.module('conference', ['ionic', 'conference.controllers', 'ngOpenFB', 'google-maps']);

app.run(function ($ionicPlatform, ngFB) {
  ngFB.init({appId: '159886427693478'});
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu/menu.html',
    controller: 'AppCtrl'
    })

    .state('app.speakers', {
      url: "/speakers",
      views: {
      'menuContent': {
          templateUrl: "templates/speaker/speakers.html",
          controller: 'SpeakersCtrl'
        }
      }
    })

    .state('app.speaker', {
    url: "/speakers/:speakerId",
    views: {
        'menuContent': {
          templateUrl: "templates/speaker/speaker.html",
          controller: 'SpeakerCtrl'
        }
      }
    })
    .state('app.sessions', {
      url: "/sessions",
      views: {
      'menuContent': {
          templateUrl: "templates/session/sessions.html",
          controller: 'SessionsCtrl'
        }
      }
    })

    .state('app.session', {
    url: "/sessions/:sessionId",
    views: {
        'menuContent': {
          templateUrl: "templates/session/session.html",
          controller: 'SessionCtrl'
        }
      }
    })
    .state('app.profile', {
    url: "/profile",
    views: {
        'menuContent': {
            templateUrl: "templates/profile/profile.html",
            controller: "ProfileCtrl"
        }
      }
    })
    .state('app.location', {
    url: "/location",
    views: {
        'menuContent': {
            templateUrl: "templates/session/location.html",
            controller: 'SessionsCtrl'
          }
        }
    })
    .state('app.location-map', {
    url: "/location/:id",
    views: {
        'menuContent': {
            templateUrl: "templates/session/location-map.html",
            controller: 'LocationMapCtrl'
          }
        }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/sessions');
});
