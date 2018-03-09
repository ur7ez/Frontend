import {combineReducers} from 'redux';
import todos from "./todos";
import visibilityFilter from "./visibility";

const todoApp = combineReducers({visibilityFilter, todos});
export default todoApp;