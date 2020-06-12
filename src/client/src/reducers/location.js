const locationReducer = (state = {lat: 44.8333, lng: -0.5667}, action)=>{
    switch (action.type){
        case 'UPDATE_LOCATION':
            return action.payload;
        default:
            return state;
    }
};

export default locationReducer;