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
    var longitude = req.body.long;
    var latitude = req.body.lat;
    //call update controller with params
    controller.update(id, longitude, latitude);
  });

  app.get('/leaderboard', function (req, res) {
    //leaderboard of # of infects
  });


  
}


