import React from "react";
import Tasks from './Tasks';

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            tasks: [],
            updTaskID: null
        };
    }

    onChange = (event) => {
        this.setState({task: event.target.value});
    };

    addTask = (event) => {
        event.preventDefault();
        let task = this.state.task.trim();
        if (task.length === 0 || !task || /^\s*$/.test(task)) return;
        task.replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
        if (this.state.tasks.includes(task)) return;
        if (this.state.updTaskID !== null) {
            let tmp = this.state.tasks.concat();
            tmp.splice(this.state.updTaskID, 1, task);
            this.setState({
                task: '',
                tasks: [...tmp],
                updTaskID: null
            });
        } else {
            this.setState({
                task: '',
                tasks: [...this.state.tasks, task]
            });
        }
    };

    onTaskDel = (task) => {
        let tmp = this.state.tasks.concat();
        tmp.splice(task, 1);
        this.setState({
            tasks: [...tmp]
        });
    };

    onUpdateTask = (task, id) => {
        this.setState({task: task, updTaskID: id});
    };

    render() {
        let status = "Add Task";
        status = (this.state.updTaskID === null) ? status : "Update Task";
        return (
            <div className="todo">
                <p>
                    <strong>Список дел</strong><br/>
                    <small><em>(старый вариант реализации - без Redux)</em></small>
                </p>
                <form className="ToDo" onSubmit={this.addTask}>
                    <input placeholder="add task to the list" id="todoInput" value={this.state.task}
                           onChange={this.onChange}/>
                    <input type="submit" id="submitTask" value={status}/>
                </form>
                <br/>
                <Tasks tasks={this.state.tasks} deleteTask={this.onTaskDel} updateTask={this.onUpdateTask}/>
            </div>
        );
    }
}