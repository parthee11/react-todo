import React, { Component } from 'react'
import TaskList from './TaskList'

export default class TaskInput extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             task: ['', {
                className: '',
                checked: false
             }],
             taskList: []
        }
    }
    
    setTaskHandler = (e) => {
        this.setState({
            task: [e.target.value, {
                className: '',
                checked: false
            }]
        })
    }

    submitTaskHandler = (e) => {
        (this.state.task[0] === null || this.state.task[0] === '') && alert('No valid task input');

        this.Ls();

        this.setState({
            task: ['', {
                className: '',
                checked: false
            }],
            taskList: JSON.parse(localStorage.getItem('tasks'))
        })
        
        e.preventDefault();
    }
    
    setTaskListHandler = () => {
        localStorage.getItem('tasks') === null ? this.setState({taskList: []}) : this.setState({taskList: JSON.parse(localStorage.getItem('tasks'))});
    }

    removeTask = (e) => {
        let id = e.target.parentElement.parentElement.dataset.key
        this.state.taskList.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(this.state.taskList))
        // taskList state is reset for refresh of the page
        this.setTaskListHandler()
    }

    checkHandle = (e) => {
        let taskList;
        localStorage.getItem('tasks') === null ? taskList = [] : taskList = JSON.parse(localStorage.getItem('tasks'))
        let id = e.target.parentElement.parentElement.parentElement.dataset.key;
        // console.log(e.target.parentElement.parentElement.parentElement.dataset.key)
        if(taskList[id][1].checked) {
            taskList[id][1].className = ''
            taskList[id][1].checked = false
        } else {
            taskList[id][1].className = 'striked'
            taskList[id][1].checked = true
        }
        localStorage.setItem('tasks', JSON.stringify(taskList))
        this.setState({
            taskList: JSON.parse(localStorage.getItem('tasks'))
        })
     }
    
    // local storage functions
    
    
    Ls = () => {
        let taskList; 
        localStorage.getItem('tasks') === null ? taskList = [] : taskList = JSON.parse(localStorage.getItem('tasks'));
        taskList.push(this.state.task);
        localStorage.setItem('tasks', JSON.stringify(taskList))
    }


    // lifecycle methods 

    componentDidMount() {
        this.setTaskListHandler(); 
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.submitTaskHandler} >
                    <h3>What's plannin' ?</h3>
                    <div className="inputField">
                        <input type="text" value={this.state.task[0]} onChange={this.setTaskHandler} required />
                        <label htmlFor="task">Enter Task</label>
                    </div>
                    <div>
                        <button type="submit">Add Task</button>
                    </div>
                </form>
                <TaskList tasksList = {this.state.taskList} removeTask={this.removeTask} checkHandle={this.checkHandle} />
            </React.Fragment>
        )
    }
}
