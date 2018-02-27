import React from "react";

export default class Tasks extends React.Component {
    delTask = (event) => {
        this.props.deleteTask(event.target.dataset.id);
        document.querySelector('#todoInput').focus();
    };

    updTask = (event) => {
        document.querySelector('#todoInput').focus();
        document.querySelector('#todoInput').value = event.target.innerText;
        this.props.updateTask(event.target.innerText, event.target.dataset.id);
    };

    render() {
        return (
            <ol>
                {
                    this.props.tasks.map((task, index) => {
                        return (
                            <div key={index}>
                                <button style={{margin: "0 10px 0 0"}} data-id={index} onClick={this.delTask}
                                        title="push to delete this task">X
                                </button>
                                <li style={{display: "initial", cursor: "pointer"}} data-id={index}
                                    onClick={this.updTask} title="click to edit task">{task}</li>
                            </div>
                        )
                    })
                }
            </ol>
        )
    }
}