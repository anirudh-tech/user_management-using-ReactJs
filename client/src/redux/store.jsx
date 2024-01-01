import {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import userReducer from './userReducer/userReducer'
import adminReducer from './userReducer/adminReducer'


const rootReducer = combineReducers({
    user: userReducer,
    users: adminReducer,
})
const store = createStore(rootReducer,{},applyMiddleware(thunk))

export default store;
