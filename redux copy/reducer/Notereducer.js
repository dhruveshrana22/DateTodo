

import { constants as types } from "../actionTypes";

const initialState = {
    note: []
}
const addNotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_NOTE: {
            console.log("action", state.note);
            return {
                note: [...state.note, action.payload]

            };

        }
        case types.UPDATE_NOTE: {
            const updateNoteIndex = state.note.findIndex(item => item.id === action.payload.id);
            if (updateNoteIndex !== -1) {
                const updateNote = {
                    ...state.note[updateNoteIndex],
                    title: action.payload.title,
                    description: action.payload.description,
                    date: action.payload.date,
                    status: action.payload.status,
                }
                const updateNotes = [...state.note];
                updateNotes[updateNoteIndex] = updateNote;
                return {
                    note: updateNotes
                };

            }
            return state

        }

        case types.DELETE_NOTE: {
            const deletedNote = state.note.filter(item => item.id !== action.payload.id);
            return {
                note: deletedNote
            };
        }

        default:
            return state;
    }
};



module.exports = {
    addNotesReducer,
}