var controller = require('../controllers/users');


module.exports = function(app){
  //put routes here such as app.get('blah blha')'
  app.get('/', function(req, res) {
    res.send(index.html);
  });
  
  //jonah is going to post data here
  app.post('/updateLocation', function(req, res) {
    var id = req.body.id;
    var longitude = req.body.long;
    var latitude = req.body.lat;
    //call update controller with params
    //controller.update(id, longitude, latitude);
    res.send(req.body);
  });

  
}


