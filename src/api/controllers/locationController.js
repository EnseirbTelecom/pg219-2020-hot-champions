const location = require('../utils/location.js');

module.exports = function(app){
    app.get('/history', location.history);
    app.put('/archiverLocation', location.archiverLocation);
    app.post('/addLocation', location.addLocation);
    app.delete('/deleteLocation',location.deleteLocation);
}
