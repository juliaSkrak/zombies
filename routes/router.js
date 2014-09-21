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
        console.log("location")
        controller.isInfected(id, function(err, isInfectedResults) {
          if (err) {
            throw err;
          }
          else{
            console.log("isInfected")
            var isInfected = isInfectedResults[0]['infected'];
            if(isInfected){
              controller.findNear(longitude, latitude, function(err, findNearResults) {
                if (err){
                  throw err;
                }
                else{
                  console.log("findNear");
                  findNearResults.forEach(function(val, ind, arr) {
                    console.log("for each")
                    controller.updateZombie(val.id, function(err, updateZombieResults) {
                      if (err) {
                        throw err;
                      }
                      else {
                        console.log("update zombie")
                        controller.updateKill(id, function(err, updateKillResults) {
                          if (err) throw err;
                          else{
                          
                          }
                        });
                      }
                    });
                  });
                  console.log("for each done")
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
        infected = isInfectedResults[0]['infected'];
        if (infected) {
          controller.killCount(id, function(err, killCountResult) {
            if (err) {
              throw err;
            }
            else {
              infectCount = killCountResult[0]['infectCount'];
              var infectJSON = {
                isInfected: infected,
                count: infectCount
              };
              console.log(infectJSON);
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
          console.log(infectJSON);

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


