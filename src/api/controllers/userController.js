const user = require('../utils/user.js');

module.exports = function(app){
    app.get('/connexion', user.connexion);
    app.post('/inscription',user.inscription);
    app.get('/userLocation', user.userLocation);
}
