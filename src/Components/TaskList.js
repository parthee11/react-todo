import React, { Component } from 'react'

export default class TaskList extends Component {   

    checkHandler = (e) => {
        e.target.parentElement.parentElement.previousElementSibling.classList.toggle('striked')
    }

    render() {
        const { tasksList, removeTask, checkHandle } = this.props
        return (
            <ul className="taskList">
                {
                    tasksList.map((task, index) => {
                        return (
                            <li className="task" key={index} data-key={index} >
                                <p className={task[1].className} >{task[0]}</p>
                                <div className="action">
                                    <div className="completed">
                                        <input type="checkbox" name="completed" onChange={checkHandle} checked={task[1].checked} />
                                    </div>
                                    <div className="remove" onClick={removeTask} >
                                        <button>&times;</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
                
            </ul>
        )
    }
}
