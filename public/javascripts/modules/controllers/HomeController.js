(function() {

  angular.module('store').controller('HomeController', ['$scope', '$rootScope', '$http', 'md5', function($scope, $rootScope, $http, md5) {

    $scope.account = {};

    $scope.signInFailed = false;
    $scope.registerFailed = false;

    $scope.signIn = function(account, action) {

      var password = account.password;

      // encrypt password
      if (action === 'sign in') {
        account.password = md5.createHash(account.password);
      }

      $http.get('/api/accounts', {
          cache: false,
          params: {
            search: {
              'email' : account.email,
              'password' : account.password,
            }
          }
      }).
        success(function(data, status, headers, config) {

          if (data.count === 1) {
            $http.get('/api/profiles', {
                cache: false,
                params: {
                  search: {
                    'email' : account.email,
                  }
                }
            }).
              success(function(data, status, headers, config) {
                if (data.count === 1) {
                  $rootScope.$broadcast('user signed in', data.profiles[0]);
                } else {
                  $scope.signInFailed = true;
                  account.password = password;
                }
              }).
              error(function(data, status, headers, config) {
                $scope.signInFailed = true;
              });
              
          } else {
            $scope.signInFailed = true;
            account.password = password;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.signInFailed = true;
        });

    };

    $scope.register = function(account) {

      // encrypt password
      account.password = account.passwordConfirmation = md5.createHash(account.password);

      var manas = [
        'black',
        'red',
        'green',
        'white',
        'blue'
      ];

      var json = {
        action: 'register',
        account: account,
      };

      var profile = {
        profile: {
          'avatar' : 'images/avatars/' + manas[Math.floor((Math.random() * 5))] + '.png',
          'email' : account.email,
          'username' : 'Novo Usuário',
        },
      };

      $http.post('/api/accounts', json).
        success(function(data, status, headers, config) {

          $http.post('/api/profiles', profile).
            success(function(data, status, headers, config) {
              $scope.signIn(account, 'register');
            }).
            error(function(data, status, headers, config) {
              $scope.registerFailed = true;
            });

        }).
        error(function(data, status, headers, config) {
          $scope.registerFailed = true;
        });

    };

  }]);

})();
