var controller = require('../controllers/user');


module.exports = function(app){
  //put routes here such as app.get('blah blha')'
  app.get('/', function(req, res) {
    res.render('index')
  });
  
  //jonah is going to post data here
  app.post('/updateLocation', function(req, res) {
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

    controller.isInfected(id, function(err, isInfectedResults) {
      if (err) {
        throw err;
      }
      else {
        //THIS IS A BOOLEAN THAT WILL CONTAIN 1 IF THE ID IS INFECTED
        console.log("THIS IS WHERE THE PRINT STATEMENTS START");

        console.log(isInfectedResults);
        console.log(isInfectedResults[0]);
        console.log(isInfectedResults[0]['infected']);

        infected = isInfectedResults[0]['infected'];
        if (infected) {

          controller.killCount(id, function(err, killCountResult) {
            if (err) {
              throw err;
            }
            else {
              console.log(killCountResult);
              infectCount = killCountResult[0]['infectCount'];
              console.log(infectCount);
              var infectJSON = {
                isInfected: infected,
                count: infectCount
              };
              res.json(infectJSON);
            }
          });
        }
        else{
          infectCount = 0;
          var infectJSON = {
            isInfected: infected,
            count: infectCount
          };

          res.json(infectJSON);
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


