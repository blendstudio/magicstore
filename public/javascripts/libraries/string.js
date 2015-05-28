(function() {

  String.prototype.truncate = function(length) {
    if (this.length > length) {
      return this.substring(0, length - 4) + ' ...';
    }

    return this + '';
  }

})();
