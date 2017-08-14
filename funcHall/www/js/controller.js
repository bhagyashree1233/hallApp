 angular.module('starter.controller', [])
     .controller('ProductCtrl', ['$scope','$location','$window' ,'$ionicModal',  '$state','$ionicScrollDelegate', '$ionicSlideBoxDelegate', function($scope,$location,$window, $ionicModal,$state,  $ionicScrollDelegate, $ionicSlideBoxDelegate) {
     console.log('Hai');
     $scope.modal4= $ionicModal.fromTemplateUrl('templates/forthImg.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) { $scope.modal4 = modal; });
    $scope.goBack=function(){
        
       $location.path("/page");
    }
     }])
     