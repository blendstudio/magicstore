(function() {

  angular.module('store').controller('UserFormController', ['$scope', '$rootScope', '$http', 'md5', 'Notification', function($scope, $rootScope, $http, md5, Notification) {

    $scope.modal = false;

    $scope.account = {};

    $scope.forms = {};
    $scope.forms.error = {};

    $scope.$on('show user form modal', function() {
      $scope.modal = true;
    });

    $scope.resetFormCustomErrors = function() {
      $scope.signInForm.$error.http = undefined;
      $scope.signInForm.$error.profile = undefined;
      $scope.signInForm.$error.account = undefined;
      $scope.signInForm.$error.password = undefined;
    };

    $scope.closeUserFormModal = function() {
      $scope.modal = false;
      $scope.account.password = null;
      $scope.account.passwordConfirmation = null;
      $scope.signInForm.$setPristine();
      $scope.signInForm.$setUntouched();
      $scope.registerForm.$setPristine();
      $scope.registerForm.$setUntouched();
    }

    $scope.signIn = function(account, action) {

      var password = account.password;

      // encrypt password
      if (action === 'sign in') {
        account.password = md5.createHash(account.password);
      }

      $http.get('/api/accounts', {
          cache: false,
          params: {
            query: {
              conditions: {
                  'email' : account.email,
                  'password' : account.password
              }
            }
          }
      }).
        success(function(data, status, headers, config) {

          if (data.count === 1) {
            $http.get('/api/profiles', {
                cache: false,
                params: {
                  query: {
                    conditions: {
                      'email' : account.email
                    }
                  }
                }
            }).
              success(function(data, status, headers, config) {
                if (data.count === 1) {
                  $rootScope.$broadcast('user signed in', data.values[0]);
                  $scope.closeUserFormModal();
                } else {
                  Notification.error({ message: 'Perfil não encontrado', delay: 2500 });
                  account.password = password;
                }
              }).
              error(function(data, status, headers, config) {
                Notification.error({ message: '/api/profiles http status code ' + status, delay: 2500 });
                account.password = password;
              });

          } else {
            Notification.error({ message: 'E-mail e/ou senha inválidos', delay: 2500 });
            account.password = password;
          }
        }).
        error(function(data, status, headers, config) {
          Notification.error({ message: '/api/accounts http status code ' + status, delay: 2500 });
          account.password = password;
        });

    };

    $scope.register = function(account) {

      if (account.password !== account.passwordConfirmation) {
        $scope.forms.error = { 'password' : true, 'message' : 'Sua senha e confirmação de senha não são iguais' };
        return;
      }

      var password = account.password;
      var passwordConfirmation = account.passwordConfirmation;

      // encrypt password
      account.password = md5.createHash(account.password);
      account.passwordConfirmation = md5.createHash(account.passwordConfirmation);

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
              $scope.forms.error = { 'http' : true, 'message' : '/api/profiles http status code ' + status };
              account.password = password;
              account.passwordConfirmation = passwordConfirmation;
            });

        }).
        error(function(data, status, headers, config) {
          $scope.forms.error = { 'htpp' : true, 'message' : '/api/accounts http status code ' + status };
          account.password = password;
          account.passwordConfirmation = passwordConfirmation;
        });

    };

  }]);

})();
