var fs = require('fs');
var request = require('request');

var sets = ['5dn',	'us', 'arb', 'ai', 'wl', 'mt', 'ap', 'arc', 'roe', 'bng', 'chk',
            'pc', 'ch', 'som', 'cmd', 'c13', 'c14', 'cma', 'cfx', 'ps', 'cns', 'dka',
            'ds', '10e', 'wwk', 'frf', 'dtk', 'dgm', 'ddh', 'dvd', 'ddf', 'gvl',
            'ddl', 'ddj', 'jvc', 'ddm', 'ddo', 'ddg', 'pvc', 'ddk', 'ddn', 'ddi', 'dpa', 
            'evg', 'eve', 'ia', 'ex', 'fe', 'sc', 'sh', 'ala', 'lg', 'cs', 'v14', 'fvl',
            'v12', 'fvr', 'v13', 'gtc', 'isd', 'di', 'in', 'on', 'jou', 'ju', 'ktk', 
            'le', 'lw', 'm10', 'm11', 'm12', 'm13', 'm14', 'm15', 'mm', 'mr', 'mi', 'mbs',
            'md1', 'mma', 'mm2', 'ne', '9e', 'nph', 'ud', 'ul', 'od', '8e', 'gp', 'shm',
            'pch', 'pc2', 'pd2', 'pd3', 'pds', 'pr', '4e', '5e', 'rav', 'rtr',
            'avr', 'rv', 'sok', '7e', '6e', 'tp', 'ths', 'ts', 'tsts', 'tr', 'bok',
            'fut', 'vi', 'zen'
           ];

var rarities = ['C', 'U', 'R', 'M'];

var dir = './public/images/set-icons/';

var download = function(uri, filename){

  request.head(uri, function(err, res, body){

    //console.log('content-type:', res.headers['content-type']);
    //console.log('content-length:', res.headers['content-length']);

    var req = request(uri).pipe(fs.createWriteStream(filename));
    req.on('close', function () {
        console.log(filename, 'ok');
      });
  });
};

var downloadSetIcons = function(sets, rarities, dir, callback) {
  
  for (var i = 0; i < sets.length; i++) {
    for (var j = 0; j < rarities.length; j++) {
      
      var uri = 'http://www.ligamagic.com.pt/images/emot/ed/' + sets[i].toUpperCase() + '_' + rarities[j] + '.gif';
      var destination = dir + sets[i].toUpperCase() + '_' + rarities[j] + '.gif';
      
      download(uri, destination);
      
    }
  }
};

downloadSetIcons(sets, rarities, dir, function() {
  console.log('Done downloading...');
});
