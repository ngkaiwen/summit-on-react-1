import { createStore } from 'redux';
import MainAppReducer from "./AppReducer.js";

let store = createStore(MainAppReducer)

export default store