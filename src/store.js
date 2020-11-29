import {createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import covid19 from './reducer/covidReducer.js';

const store = createStore(covid19, composeWithDevTools());

export default store;