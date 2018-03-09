import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions/index';

let AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                let task = input.value.trim();
                if (task.length === 0 || !task || /^\s*$/.test(task)) return;
                task.replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
                dispatch(addTodo(task));
                input.value = '';
            }} className="ToDo">
                <input placeholder="add task to the list" ref={node => {
                    input = node
                }} id="todoInput2"/>
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
};
export default AddTodo = connect()(AddTodo);