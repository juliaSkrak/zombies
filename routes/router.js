var controller = require('../controllers/user');


module.exports = function(app){
  //put routes here such as app.get('blah blha')'
  app.get('/', function(req, res) {
    res.render('index')
  });
  
  //jonah is going to post data here
  app.post('/updateLocation', function(req, res) {
    console.log(req.body);
    var id = req.body.id;
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;

    //call update controller with params
    controller.updateLocation(id, longitude, latitude, function(err, results) {
      if (err) {
        throw err;
      }
      else {
        console.log(results);
      }
    });
  });

  app.post('/isZombie', function(req, res) {
    var id = req.body.id;
    var infected;
    var infectCount;
    controller.isInfected(id, function(err, results) {
      if (err) {
        throw err;
      }
      else {
        infected = results[0]['infected'];
        if (infected) {
          controller.killCount(id, function(err, results) {
            if (err) {
              throw err;
            }
            else {
              infectCount = results[0]['infectCount'];
              var infectJSON = {
                isInfected: infected,
                count: infectCount
              };
              res.send(infectJSON);
            }
          });
        }
        else{
          infectCount = 0;
          console.log('person is not infected bruh');
        }
      }
    });
  });

  app.get('/leaderboard', function (req, res) {
    //leaderboard of # of infects
  });



}


