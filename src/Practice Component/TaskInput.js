import React, { Component } from 'react'

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

    taskInputHandle = (e) => {
        this.setState({
            task: [e.target.value, {
                className: '',
                checked: false
            }]
        })
    }

    submitHandle = (e) => {
        let taskList;
        localStorage.getItem('tasksNew') === null ? taskList = [] : taskList = JSON.parse(localStorage.getItem('tasksNew'))
        taskList.push(this.state.task);
        localStorage.setItem('tasksNew', JSON.stringify(taskList));

        this.setState({
            task: ['', {
                className: '',
                checked: false
            }],
            taskList: JSON.parse(localStorage.getItem('tasksNew'))
        })

        e.preventDefault();
     }

     componentDidMount() {
        localStorage.getItem('tasksNew') === null ? this.setState({taskList: []}) : this.setState({taskList: JSON.parse(localStorage.getItem('tasksNew'))});
     }

     checkHandle = (e) => {
        let taskList;
        localStorage.getItem('tasksNew') === null ? taskList = [] : taskList = JSON.parse(localStorage.getItem('tasksNew'))
        let id = e.target.parentElement.dataset.id;
        if(taskList[id][1].checked) {
            taskList[id][1].className = ''
            taskList[id][1].checked = false
        } else {
            taskList[id][1].className = 'striked'
            taskList[id][1].checked = true
        }
        localStorage.setItem('tasksNew', JSON.stringify(taskList))
        this.setState({
            taskList: JSON.parse(localStorage.getItem('tasksNew'))
        })
     }
    
    render() {
        console.log(this.state.task)
        return (
            <React.Fragment>
                <form onSubmit={this.submitHandle} >
                    <div className="inputField" value={this.state.task[0]} onChange={this.taskInputHandle} >
                        <input type="text"/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <ul className="taskList">
                    {
                        this.state.taskList.map((task, index) => {
                            return (
                                <li key={index} data-id={index} >
                                    <p className={task[1].className} >{task[0]}</p>
                                    <input type="checkbox" onClick={this.checkHandle} checked={task[1].checked} />
                                </li>
                            )
                        })
                    }
                </ul>
            </React.Fragment>
        )
    }
}
