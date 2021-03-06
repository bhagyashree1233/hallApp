angular.module('starter', ['ionic','ngCordova','starter.controller','starter.services','starter.filter','starter.directive'])

.run(function($ionicPlatform,$cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function( ) {
    if(window.cordova && window.cordova.plugins.Keyboard) {
    
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

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
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })
  .state('assign', {
    url: '/assign',
    templateUrl: 'templates/assign.html'
  })
  .state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html'
  })
  .state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
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
     
 $urlRouterProvider.otherwise('home');
});
