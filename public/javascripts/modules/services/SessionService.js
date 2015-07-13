(function() {

  angular.module('store').factory('SessionService', ['$http', '$cookies', function($http, $cookies) {

    var session = {};
    var profile = {};
    var cart = {};

    var create = function() {
      var promise = $http.post('/api/sessions').then(function (response) {
        return response.data;
      });

      return promise;
    };

    var getSession = function() {
      return this.session;
    }

    var setSession = function(session) {
      this.session = session;
      return;
    }

    var getProfile = function() {
      return this.profile;
    }

    var setProfile = function(sessionId, profile) {
      var promise = $http.post('/api/sessions', { sessionId : sessionId, profileId : profile._id }).then(function (response) {
        return response.data;
      });

      this.profile = profile;

      return promise;
    };

    var log = function() {
      console.log(this.session, this.profile, this.cart);
    };

    return {
      create: create,
      getSession: getSession,
      setSession: setSession,
      getProfile: getProfile,
      setProfile: setProfile,
      log: log
    };

  }]);

})();
