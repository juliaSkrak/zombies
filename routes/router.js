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
    controller.updateLocation(id, longitude, latitude);
  });

  app.get('/leaderboard', function (req, res) {
    //leaderboard of # of infects
  });

  
}


