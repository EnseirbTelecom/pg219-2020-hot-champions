const locationReducer = (state = {location:{lat: 44.8333, lng: -0.5667}, time:{date:'', time:''}}, action)=>{
    switch (action.type){
        case 'UPDATE_LOCATION':
            return action.payload;
        default:
            return state;
    }
};

export default locationReducer;