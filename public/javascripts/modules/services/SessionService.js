(function() {

  angular.module('store').factory('SessionService', ['$http', '$cookies', function($http, $cookies) {

    var session = {};

    return {

      create: function() {
        var promise = $http.post('/api/sessions').then(function (response) {
          return response.data;
        });

        return promise;
      }

    };

  }]);

})();
