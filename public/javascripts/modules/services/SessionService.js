(function() {

  angular.module('store').factory('SessionService', ['$http', function($http) {

    var create = function() {
      var promise = $http.post('/api/sessions').then(function(response) {
        return response.data;
      });

      return promise;
    };

    var loadSession = function(sessionId) {
      var promise = $http.get('/api/sessions', { params: { query: { conditions: { '_id': sessionId } } } }).then(function(response) {
        return response.data;
      });

      return promise;
    }

    var loadProfile = function(sessionId) {
      var promise = loadSession(sessionId).then(function(response) {
        if (response.count != 1) {
          return null;
        }

        var session = response.values[0];

        if (session && session.profileId) {
          return $http.get('/api/profiles', { params: { query: { conditions: { '_id': session.profileId } } } });
        }

        return null;
      })
      .then(function(response) {
        if (response && response.data.count == 1) {
          return response.data;
        }

        return null;
      });

      return promise;
    }

    var linkProfileToSession = function(sessionId, profileId) {
      var promise = $http.post('/api/sessions', { sessionId : sessionId, profileId : profileId }).then(function(response) {
        return response.data;
      });

      return promise;
    };

    return {
      create: create,
      loadSession: loadSession,
      loadProfile: loadProfile,
      linkProfileToSession: linkProfileToSession,
    };

  }]);
})();
