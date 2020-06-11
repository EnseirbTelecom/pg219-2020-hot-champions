const friends = require('../utils/friends.js');

module.exports = function(app){
    app.get('/friends', friends.friendList);
    app.put('/friends',friends.acceptFriend);
    app.post('/friends', friends.askFriend);
    app.delete('/friends',friends.deleteFriend);
}