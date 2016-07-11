var db = require("seraph")({
  // user: 'local',
  pass: 'test'
});
var model = require('seraph-model');

// db.changePassword('test', function(err) {
//   //password is now changed, and `db`'s options have been updated with the new password
// });

var User = model(db, 'user');
User.useTimestamps()

// User.save({ name: 'Fanny', city: 'Btown' }, function(err, saved) {
//   if (err) throw err;

//   User.findAll(function(err, allUsers) {
//     // allUsers -> [{ name: 'Jon', city: 'Bergen', id: 0 }]
//   });

// })

var test = User.where({ city: 'Btown' }, function(err, usersFromBergen) {
    console.log(usersFromBergen)
    usersFromBergen[0].name="Updated"
        console.log(usersFromBergen)

    User.save(usersFromBergen[0], function(err, saved){
         if (err) {console.log(err)};
         console.log(err)
         console.log(saved)
         console.log('hi')
    })
    // test.save({name:'Tim'}, function(err,saved){
    //     if (err) throw err;
    // })
  });