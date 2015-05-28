(function() {

  var fs = require('fs');
  var request = require('request');

  var _ = require('lodash');

  var cards = require('../data/cards');

  var dir = 'D:/workspace/blendstudio/magicstore/public/images/cards/';

  var download = function(uri, filename){

    request.head(uri, function(err, res, body){

      var req = request(uri).pipe(fs.createWriteStream(filename));

      req.on('close', function () {
        console.log(filename, 'ok');
      });

    });
  };

  var downloadCardImages = function(dir, callback) {

    var chunks = _.chunk(cards, 100);
    console.log(chunks.length);

    var index = process.argv[2];

    for (var i = 0; i < chunks[index].length; i++) {

      var uri = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + '178026' + '&type=card';
      var destination = dir + '178026' + '.jpg';

      download(uri, destination);

    }

  };

  downloadCardImages(dir, function() {
    console.log('Done downloading ...');
  });

})();
