const friendsReducer = (state = [{status:1, location:{lat: 44.8444, lng: -0.5655}, pseudoFriend: "Tourpagne",email:"test@test.fr", couleur : "#FF5733"}, {status:2,email:"test@test.fr", location:{lat: 44.8444, lng: -0.5650}, pseudoFriend: "Boule", couleur : "#717A1D"}, {status:0, email:"test@test.fr",location:{lat: 44.8454, lng: -0.5650}, pseudoFriend: "Bil", couleur : "#00FF93"}], action)=>{
    switch (action.type){
        case 'UPDATE_FRIENDS':
            return action.payload;
        default:
            return state;
    }
};

export default friendsReducer;