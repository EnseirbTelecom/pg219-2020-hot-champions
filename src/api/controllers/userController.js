const user = require('./user.js');

module.exports = function(app){
    app.get('/connexion', user.connexion);
    app.post('/inscription',user.inscription);
}