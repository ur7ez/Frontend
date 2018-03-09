import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({todos, onTodoClick, onTodoDel, onTodoUpd}) => (
    <ul style={{
        textAlign: "left",
        display: "inline-block"
    }}>
        {todos.map(todo => (
                <Todo
                    key={todo.id}
                    {...todo}
                    onChange={() => onTodoClick(todo.id)}
                    onDelete={() => onTodoDel(todo.id)}
                    onUpdate={() => onTodoUpd(todo.id, todo.text)}
                />
            )
        )}
    </ul>
);

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.number.isRequired,
                completed: PropTypes.bool.isRequired,
                text: PropTypes.string.isRequired
            }
        ).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired,
    onTodoDel: PropTypes.func.isRequired,
    onTodoUpd: PropTypes.func.isRequired
};

export default TodoList;