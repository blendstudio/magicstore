(function() {

  angular.module('store').factory('SessionService', ['$http', '$cookies', function($http, $cookies) {

    var session = {};
    var profile = {};
    var cart = {};

    var create = function() {
      var promise = $http.post('/api/sessions').then(function(response) {
        setSession(response.data);
        return response.data;
      });

      return promise;
    };

    var getSession = function() {
      return this.session;
    }

    var loadSession = function(sessionId) {
      var promise = $http.get('/api/sessions', { params: { id : sessionId } }).then(function(response) {
        return response.data;
      });

      return promise;
    }

    var setSession = function(session) {
      this.session = session;
      return;
    }

    var getProfile = function() {
      return this.profile;
    }

    var loadProfile = function(sessionId) {
      var promise = loadSession(sessionId).then(function(response) {
        var session = response;
        return $http.get('/api/profiles', { params: { search: { _id: session.profileId } } });
      })
      .then(function(response) {
        setProfile(response.data);
        return response.data;
      });

      return promise;
    }

    var setProfile = function(profile) {
      this.profile = profile;
      return;
    }

    var createProfile = function(sessionId, profile) {
      var promise = $http.post('/api/sessions', { sessionId : sessionId, profileId : profile._id }).then(function(response) {
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
      loadSession: loadSession,
      setSession: setSession,
      getProfile: getProfile,
      loadProfile: loadProfile,
      setProfile: setProfile,
      createProfile: createProfile,
      log: log
    };

  }]);

})();
