angular.module('starter', ['ionic','ngCordova','starter.controller','starter.services','starter.filter','starter.directive'])

.run(function($ionicPlatform,$cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function( ) {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (window.cordova) {
      $rootScope.db = $cordovaSQLite.openDB({ name: "starter.db", location: 'default' }); //device
     console.log("Android");
    }else{
      $rootScope.db = window.openDatabase("starter.db", '1', 'mail', 1024 * 1024 * 100); // browser
      console.log("browser");
    } 
 //   $cordovaSQLite.execute($rootScope.db, "drop table UserMessages").then( console.log('dropped')) 
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS UserMessages (id integer primary key autoincrement, userId text not null, name text, avatar text, messageText text, dateTimeMessage text, messageType text)").then( console.log('UserMessages table created Successfully'));

  
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  
  .state('Test1', {
    url: '/Test',
    templateUrl: 'templates/Test.html',
    
  })
    .state('page', {
    url: '/page',
    templateUrl: 'templates/Product.html',
    
  })
.state('compose', {
    url: '/compose',
    templateUrl: 'templates/UserMessages.html',
    controller:'UserMessagesCtrl'
    
  })
 $urlRouterProvider.otherwise('page');
});
