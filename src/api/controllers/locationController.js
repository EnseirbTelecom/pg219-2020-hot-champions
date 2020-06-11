const location = require('../utils/location.js');

module.exports = function(app){
    app.get('/location', location.history);
    app.put('/location', location.archiverLocation);
    app.post('/location', location.addLocation);
    app.delete('/location',location.deleteLocation);
}
