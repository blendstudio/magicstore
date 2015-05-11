(function() {
  
  angular.module('store').factory('MessageService', function() {
    
    var messages = [];
    
    return {
      
      queue: function(message) {
        return messages.push(message);
      },

      dequeue: function() {
        if (messages.length) {
          return messages.shift();
        }
        
        else {
          return null;
        }
      }
      
    };
    
  });
  
})();