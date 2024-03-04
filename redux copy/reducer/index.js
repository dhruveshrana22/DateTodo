import { combineReducers } from "redux";
import { addNotesReducer } from "./Notereducer";

const appReducer = combineReducers({
    addNotesReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
