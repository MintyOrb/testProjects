var incan_client = require("node-incandescent-client").client;
var fs = require('fs');

var client = new incan_client(6594, 'c4892a66466c286da256257e02b2e7d8');

client.addImageUrl('http://pdg3.lbl.gov/atlasblog/wp-content/uploads/2012/04/bigbang.jpg');

client.assemble();

client.sendRequest(function(projectId) { 
    console.log(projectId);

    client.getResults(projectId, function(data) {
        console.log(data);
        writeJSONtoFile(data, 'test.json')
    })
});

var writeJSONtoFile = function(obj, fileName){
    fs.writeFile(fileName, JSON.stringify(obj), function (err, data) {
      if (err) { console.error(err); return };
      console.log('done writing to file!')
    });
}