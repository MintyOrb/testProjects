var db = require("seraph")({
  // user: 'neo4j',
  pass: 'test'
});
var model = require('seraph-model');
var companies = require('./su_companies.js').companies


var Company = model(db, 'su_company');
Company.useTimestamps();
Company.setUniqueKey('Name');

//turn into a generic loader? Enter label, pull all properties from object
// expect list of objects? object of objects? either?
for(var comp in companies){
    Company.save({
        Name: companies[comp]["Company"],
        Summary: companies[comp]["Summary"],
        Logo: companies[comp]["Logo?"],
        Industry: companies[comp]["Industry"],
        Type: companies[comp]["SU Ecosystem "],
        Affiliation: companies[comp]["Affiliation"],
        Headquarters: companies[comp]["Headquarters"],
        URL: companies[comp]["URL"]
    }, function(err, saved){
        console.log(err)
        if (err) throw err;
        console.log('saved!')
    })
    // break
}
// User.save({ name: 'Fanny', city: 'Btown' }, function(err, saved) {
//   if (err) throw err;

//   User.findAll(function(err, allUsers) {
//     // allUsers -> [{ name: 'Jon', city: 'Bergen', id: 0 }]
//   });

// })

// var test = User.where({ city: 'Btown' }, function(err, usersFromBergen) {
//     console.log(usersFromBergen)
//     usersFromBergen[0].name="Updated"
//         console.log(usersFromBergen)

//     User.save(usersFromBergen[0], function(err, saved){
//          if (err) {console.log(err)};
//          console.log(err)
//          console.log(saved)
//          console.log('hi')
//     })
//     // test.save({name:'Tim'}, function(err,saved){
//     //     if (err) throw err;
//     // })
//   });