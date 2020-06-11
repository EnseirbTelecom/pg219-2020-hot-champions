const user = require('../utils/user.js');

module.exports = function(app){
    app.get('/user', user.connexion);
    app.post('/user',user.inscription);
    app.get('/user/location', user.userLocation);
}
