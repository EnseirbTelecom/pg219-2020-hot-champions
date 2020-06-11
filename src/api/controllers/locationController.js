const location = require('../utils/location.js');

module.exports = function(app){
    app.get('', location.history);
    app.put('', location.archiverLocation);
    app.post('', location.addLocation);
    app.delete('',location.deleteLocation);
}
