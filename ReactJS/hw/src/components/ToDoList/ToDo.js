import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({onChange, onDelete, onUpdate, completed, text}) => (
    <div>
        <button style={{margin: "0 10px 0 0"}} onClick={onDelete}
                title="push to delete this task">X
        </button>
        <li
            style={{
                display: "inline",
                cursor: 'pointer',
                textDecoration: completed ? 'line-through' : 'none'
            }}
            onClick={onUpdate}
            title="click to edit this task"
        >
            {text}
        </li>
        <input type="checkbox" title="toggle this task between active / completed"
               onChange={onChange} checked={completed ? 'checked' : ''}/>
    </div>
);

Todo.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;