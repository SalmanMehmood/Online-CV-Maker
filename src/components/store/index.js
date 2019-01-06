
import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import AUTH from './reducer/Authentication';
import CV_DATA from './reducer/Getdata';

const middleware = applyMiddleware(thunk)
export const rootreducers = combineReducers({
    AUTH,
    CV_DATA
})

let store = createStore(rootreducers,middleware);

store.subscribe(()=>{
})

export default store;