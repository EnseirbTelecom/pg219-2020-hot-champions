import friendsReducer from './friends'
import userReducer from './user'
import locationReducer from './location'
import isAuthReducer from './isAuth'
import{combineReducers} from 'redux'

const allReducers = combineReducers({
    friends: friendsReducer,
    user: userReducer,
    location: locationReducer,
    token: isAuthReducer,
})

export default allReducers;