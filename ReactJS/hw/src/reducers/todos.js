import {ADD_TODO, DEL_TODO, TOGGLE_TODO, UPD_TODO} from "../actions/index";

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            let updateID = state.updateID;
            if (updateID !== undefined) {
                delete state.updateID;
                return state.map((t) => {
                    if (t.id !== updateID) {
                        return t;
                    }
                    return Object.assign({}, t, {
                        text: action.text
                    });
                });
            }
            if (state.length !== 0) {
                let chk_val = state.filter(function (el) {
                    return el.text === action.text;
                });
                if (chk_val.length !== 0) return state;
            }
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case UPD_TODO:
            state.updateID = action.id;
            return state;
        case DEL_TODO:
            if (state.length === 1) {
                return [];
            } else {
                return state.filter(function (el) {
                    return el.id !== action.id;
                });
            }
        case TOGGLE_TODO:
            return state.map((t) => {
                if (t.id !== action.id) {
                    return t;
                }
                return Object.assign({}, t, {
                    completed: !t.completed
                });
            });
        default:
            return state;
    }
};

export default todos;