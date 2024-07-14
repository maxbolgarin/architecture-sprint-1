import { createStore } from 'redux';
import { userReducer } from './user';

const store = createStore(userReducer);

export default store;