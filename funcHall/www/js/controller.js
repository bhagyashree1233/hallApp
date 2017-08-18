 angular.module('starter.controller', [])
 .controller('loginCtrl', function($scope, $location) {
    $scope.user = {};
    $scope.loginErr = "";
    console.log('hi');
    $scope.login = function(user) {
        //console.log('hi');
        $scope.loginErr = "";
        var username = user.name;
        var password = user.password;
        if (username == "user" && password == "user") {
            $location.path('/list');
        }else {
            $scope.loginErr = "Warning!... Invalid username or passwor-d";
        }
    }
    ;

})


.controller('homeCtrl', function($scope, $location) {
    $scope.public=function(){
        $location.path('page');
    }

     $scope.login = function() {

         $location.path('/login');
     }
})

.controller('listCtrl', function($scope, $location) {
     $scope.assign = function() {

         $location.path('/assign');
     }
})

.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})


.controller('MsgCtrl', function($scope, $timeout, $ionicScrollDelegate) {

  $scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
  d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

})
     .controller('ProductCtrl', ['$scope', '$location', '$window', '$ionicModal', '$state', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', function($scope, $location, $window, $ionicModal, $state, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
         console.log('Hai');

         $scope.model1 = $ionicModal.fromTemplateUrl('templates/firstImg.html', {
             scope: $scope,
             animation: 'slide-in-up'
         }).then(function(modal) {
             $scope.model1 = modal;
         });
         $scope.model2 = $ionicModal.fromTemplateUrl('templates/secondImg.html', {
             scope: $scope,
             animation: 'slide-in-up'
         }).then(function(modal) {
             $scope.model2 = modal;

         });
         $scope.model3 = $ionicModal.fromTemplateUrl('templates/thirdImg.html', {
             scope: $scope,
             animation: 'slide-in-up'
         }).then(function(modal) {
             $scope.model3 = modal;
         });

         $scope.model4 = $ionicModal.fromTemplateUrl('templates/forthImg.html', {
             scope: $scope,
             animation: 'slide-in-up'
         }).then(function(modal) {
             $scope.model4 = modal;
         });
         $scope.goBack = function(model) {
             console.log(model);
             console.log('HAi')
             //$scope.modal4.hide();
             $scope[model].hide();
         }

         $scope.compose = function() {
             $state.go('compose');
         }
     }])
     .controller('UserMessagesCtrl', ['$scope', '$rootScope', '$state',
         '$stateParams', 'myFactory', '$ionicActionSheet',
         '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval', '$cordovaSQLite', '$rootScope', '$ionicHistory',
         function($scope, $rootScope, $state, $stateParams, myFactory,
             $ionicActionSheet, $ionicPopup, $ionicScrollDelegate, $timeout, $interval, $cordovaSQLite, $rootScope, $ionicHistory) {

             $scope.userDetails = {};
             $scope.$on('$ionicView.beforeEnter', function(event, data) {
                 console.log('entered before enter');
                 $scope.userDetails = myFactory.get();
                 console.log($scope.userDetails);

                 $scope.toUser = {
                     _id: $scope.userDetails.userId,
                     pic: $scope.userDetails.avatar,
                     username: $scope.userDetails.name
                 }

                 // this could be on $rootScope rather than in $stateParams
                 $scope.user = {
                     _id: 'mallikarjun123',
                     pic: '/img/me.jpg',
                     username: 'Sam'
                 };

                 $scope.input = {
                     message: localStorage['userMessage-' + $scope.toUser._id] || ''
                 };

                 getMessages();
                 $scope.headerName = $scope.toUser.username;
             });

             $scope.$on('$ionicView.enter', function() {
                 console.log('UserMessages $ionicView.enter');


                 $timeout(function() {
                     footerBar = document.body.querySelector('#userMessagesView .bar-footer');
                     scroller = document.body.querySelector('#userMessagesView .scroll-content');
                     txtInput = angular.element(footerBar.querySelector('textarea'));
                 }, 0);

                 messageCheckTimer = $interval(function() {
                     // here you could check for new messages if your app doesn't use push notifications or user disabled them
                 }, 20000);
             });

             $scope.$on('$ionicView.leave', function() {
                 console.log('leaving UserMessages view, destroying interval');
                 // Make sure that the interval is destroyed
                 if (angular.isDefined(messageCheckTimer)) {
                     $interval.cancel(messageCheckTimer);
                     messageCheckTimer = undefined;
                 }
             });

             $scope.$on('$ionicView.beforeLeave', function() {
                 if (!$scope.input.message || $scope.input.message === '') {
                     localStorage.removeItem('userMessage-' + $scope.toUser._id);
                 }
                 $scope.messages = [];
                 $scope.userDetails = {};
                 $scope.headerName = "";
                 console.log('cleared mesgs')
             });

             var messageCheckTimer;

             var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
             var footerBar; // gets set in $ionicView.enter
             var scroller;
             var txtInput; // ^^^    

             console.log('dummy......................................')
             $scope.messages = [];

             function getMessages() {
                 var query = "select * from UserMessages where userId = '" + $scope.toUser._id + "'"; //'sandeep123'"; 
                 console.log('entered get messages...')

                 $cordovaSQLite.execute($rootScope.db, query).then(function(res) {
                     console.log('responded rows :' + res.rows.length);
                     for (var i = 0; i < res.rows.length; i++) {
                         $scope.messages[i] = {
                             userId: res.rows.item(i).userId,
                             name: res.rows.item(i).name,
                             avatar: res.rows.item(i).avatar,
                             messageText: res.rows.item(i).messageText,
                             dateTimeMessage: res.rows.item(i).dateTimeMessage,
                             messageType: res.rows.item(i).messageType
                         };
                     }
                 })

                 $timeout(function() {
                     viewScroll.scrollBottom();
                 }, 0);

             }

             /* $scope.$watch('input.message', function(newValue, oldValue) {
		
      console.log('input.message $watch, newValue ' + newValue);
      console.log('Old value:---------- '+oldValue);
      if (!newValue) newValue = '';
      localStorage['userMessage-' + $scope.toUser._id] = newValue;
    });*/

             $scope.sendMessage = function(sendMessageForm) {
                 console.log(sendMessageForm);

                 var message = {
                     userId: $scope.toUser._id,
                     messageText: $scope.input.message,
                     dateTimeMessage: new Date(),
                     name: $scope.toUser.username,
                     avatar: $scope.toUser.pic,
                     messageType: 'sent'
                 };
                 console.log(message);

                 // if you do a web service call this will be needed as well as before the viewScroll calls
                 // you can't see the effect of this in the browser it needs to be used on a real device
                 // for some reason the one time blur event is not firing in the browser but does on devices
                 keepKeyboardOpen();

                 //MockService.sendMessage(message).then(function(data) {
                 $scope.input.message = '';

                 $scope.hardcodeValues(message);
                 $scope.messages.push(message);

                 $timeout(function() {
                     keepKeyboardOpen();
                     viewScroll.scrollBottom(true);
                 }, 0);

                 $timeout(function() {
                     var repliedMessage = {
                         dateTimeMessage: new Date(),
                         messageText: 'This text is hard coded and stored in database',
                         messageType: 'recieved',
                         userId: $scope.toUser._id,
                         name: $scope.toUser.username,
                         avatar: $scope.toUser.pic
                     };

                     console.log(message.messageType);
                     $scope.hardcodeValues(repliedMessage); //to save automatic hard coded reply messages

                     $scope.messages.push(repliedMessage);
                     keepKeyboardOpen();
                     viewScroll.scrollBottom(true);
                 }, 2000);

                 //}); 
             };

             $scope.hardcodeValues = function(message) {
                 var d = new Date();
                 insertUserMessages(message.userId, message.name, message.avatar, message.messageText, d, message.messageType);
             
             }

             function insertUserMessages(userId, name, avatar, messageText, dateTimeMessage, messageType) {
                 var d = new Date();
                 var query = "INSERT INTO UserMessages (userId, name, avatar, messageText, dateTimeMessage, messageType) VALUES (?,?,?,?,?,?)";
                 $cordovaSQLite.execute($rootScope.db, query, [userId, name, avatar, messageText, dateTimeMessage, messageType]).then(function(res) {
                     console.log("INSERT ID -> " + res.insertId);
                     console.log("UserMessages records inserted successfully...");
                 }, function(err) {
                     console.error(err);
                 });
             }

             // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
             function keepKeyboardOpen() {
                 console.log('keepKeyboardOpen');
                 txtInput.one('blur', function() {
                     console.log('textarea blur, focus back on it');
                     txtInput[0].focus();
                 });
             }

             $scope.onMessageHold = function(e, itemIndex, message) {
                 console.log('onMessageHold');
                 console.log('message: ' + JSON.stringify(message, null, 2));
                 $ionicActionSheet.show({
                     buttons: [{
                         text: 'Copy Text'
                     }, {
                         text: 'Delete Message'
                     }],
                     buttonClicked: function(index) {
                         switch (index) {
                             case 0: // Copy Text
                                 //cordova.plugins.clipboard.copy(message.text);

                                 break;
                             case 1: // Delete
                                 // no server side secrets here :~)
                                 $scope.messages.splice(itemIndex, 1);
                                 $timeout(function() {
                                     viewScroll.resize();
                                 }, 0);

                                 break;
                         }

                         return true;
                     }
                 });
             };

             // this prob seems weird here but I have reasons for this in my app, secret!
             $scope.viewProfile = function(msg) {
                 if (msg.userId === $scope.user._id) {
                     // go to your profile
                 } else {
                     // go to other users profile
                 }
             };

             // I emit this event from the monospaced.elastic directive, read line 480
             $scope.$on('taResize', function(e, ta) {
                 console.log('taResize......' + ta + '...........');
                 if (!ta) return;

                 var taHeight = ta[0].offsetHeight;
                 console.log('taHeight: ' + taHeight);

                 if (!footerBar) return;

                 var newFooterHeight = taHeight + 10;
                 newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

                 footerBar.style.height = newFooterHeight + 'px';
                 scroller.style.bottom = newFooterHeight + 'px';
             });


             // })    

             $scope.goBack = function() {
                 $ionicHistory.goBack();
                 console.log('entered back')
             }
         }
     ])