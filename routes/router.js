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

    controller.updateLocation(id, longitude, latitude, function(err, updateLocationResults) {
      if (err) throw err;
      else {
        controller.isInfected(id, function(err, isInfectedResults) {
          if (err) {
            throw err;
          }
          else{
            var isInfected = isInfectedResults[0]['infected'];
            if(isInfected){
              controller.findNear(longitude, latitude, function(err, findNearResults) {
                if (err){
                  throw err;
                }
                else{
                  findNearResults.forEach(function(val, ind, arr) {
                    controller.updateZombie(val.id, function(err, updateZombieResults) {
                      if (err) {
                        throw err;
                      }
                      else {
                        controller.updateKill(id, function(err, updateKillResults) {
                          if (err) throw err;
                          else{
                          
                          }
                        });
                      }
                    });
                  });
                }
              });
            }
          }
        });
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
          controller.killCount(id, function(err, result) {
            if (err) {
              throw err;
            }
            else {
              infectCount = result[0]['infectCount'];
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


