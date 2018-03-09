/**
 * action types
 */
export const ADD_TODO = 'ADD_TODO';
export const DEL_TODO = 'DEL_TODO';
export const UPD_TODO = 'UPD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/**
 * visibility constants
 */
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

let nextTodoId = 0;

/**
 * action creators
 */

export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        id: nextTodoId++,
        text
    }
};

export const delTodo = (id) => {
    document.querySelector('#todoInput2').focus();
    return {
        type: DEL_TODO,
        id
    }
};

export const toggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        id
    }
};

export const updTodo = (id, text) => {
    return {
        type: UPD_TODO,
        id, text
    }
};

export const setVisibilityFilter = (filter) => {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
};