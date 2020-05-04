const friends = require('./friends.js');

module.exports = function(app){
    app.get('/friendList', friends.friendList);
    app.put('/acceptFriend',friends.acceptFriend);
    app.post('/askFriend', friends.askFriend);
    app.delete('/deleteFriend',friends.deleteFriend);
}