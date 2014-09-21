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
        infectedPerson = results[0]['infected'];
        if (infectedPerson) {
          controller.killCount(id, function(err, res) {
            if (err) {
              throw err;
            }
            else {
              infectedCount = res[0]['infectCount'];
              var infectJSON = {
                isInfected: infectedPerson,
                count: infectCount
              };
              console.log(infectJSON);
              res.json(infectJSON);
            }
          });
        }
        else{
          infectCount = 0;
          var notInfect = {
            isInfected: infectedPerson,
            count: infectCount
          };
          console.log(notInfect);
          res.json(notInfect)

        }
      }
    });
  });

  app.get('/getAll', function(req, res) {
    controller.findTotal(function(err, results) {
      if (err) {
        throw err;
      }
      else{
        res.json(results);

      }
    });
  });



  app.get('/leaderboard', function (req, res) {
    //leaderboard of # of infects
  });



}


