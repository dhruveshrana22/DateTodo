
import { constants as types } from "../actionTypes";

const addNotes = (payload) => {
    const action = {
        type: types.ADD_NOTE,
        payload,
    }
    return action;
}

const updateNote = (payload) => {
    const action = {
        type: types.UPDATE_NOTE,
        payload,
    }
    return action;
}

const deleteNote = (payload) => {
    const action = {
        type: types.DELETE_NOTE,
        payload,
    }
    return action;
}

module.exports = {
    addNotes,
    deleteNote,
    updateNote,
}