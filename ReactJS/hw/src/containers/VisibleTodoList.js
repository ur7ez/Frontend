import {connect} from 'react-redux';
import {toggleTodo, delTodo, updTodo, VisibilityFilters} from '../actions/index';
import TodoList from '../components/ToDoList/TodoList';

/**
 * фильтрует state.todos согласно state.visibilityFilter
 * @param todos - array of tasks
 * @param filter - string
 * @return {*}
 */
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }
};

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        },
        onTodoDel: (id) => {
            dispatch(delTodo(id));
        },
        onTodoUpd: (id, text) => {
            document.querySelector('#todoInput2').focus();
            document.querySelector('#todoInput2').value = text;
            dispatch(updTodo(id, text));
        }
    }
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default VisibleTodoList;