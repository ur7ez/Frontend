/*
Разработанное SPA на ReactJS - To Do List ранее => переделать в стиле Redux.
Задание с "*" - добавить фильтр к To Do List: "All" and "Completed" - это будут чекбоксы обычные. И добавить Toggle button's к To Do item'ам соотвественно, чтоб помечать "выполненные или нет".
*/

import React, {Component} from "react";
import AddTodo from "../../containers/AddTodo";
import VisibleTodoList from "../../containers/VisibleTodoList";
import Filter from './Filter';

export default class TodoApp extends Component {
    render() {
        return (
            <div className="todo">
                <p>
                    <strong>Список дел</strong><br/>
                    <small><em>(вариант реализации с использованием Redux)</em></small>
                </p>
                <Filter/>
                <AddTodo/>
                <VisibleTodoList/>
            </div>
        )
    }
}