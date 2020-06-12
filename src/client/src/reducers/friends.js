const friendsReducer = (state = [], action)=>{
    switch (action.type){
        case 'UPDATE_FRIENDS':
            return action.payload;
        default:
            return state;
    }
};

export default friendsReducer;