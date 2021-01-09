import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import { useState } from 'react';
import { addProject, deleteProject, setSelectedProject, addTask, deleteTask } from '../../actions/fetch';

const TaskList = ({ authStatus, tasks, selectedProject, addProject, deleteProject, setSelectedProject, addTask, deleteTask }) => {
    const [input, setInput] = useState('');

    const renderedItems = Object.keys(tasks).map((key) => {
        return <li key={key}><span>{tasks[key].title}</span><button onClick={() => deleteTask(key)}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button></li>
    })

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        addTask({
            title: input,
            userId: authStatus.userDetails.userId,
            postId: selectedProject.id
        });
        setInput('');
    }

    if (authStatus.isSignedIn) {
        if (selectedProject.id) {
            return (
                <section id='task-list' className="task-list">
                    <h1>{selectedProject.title}</h1>

                    <h4>Tasks</h4>
                    <ul>
                        {renderedItems}
                    </ul>
                    <form onSubmit={onFormSubmit}>
                        <input onChange={onInputChange} value={input} placeholder="Add new project" type="text" />
                        <button type="submit"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                    </form>
                </section>
            )
        } else {
            return (
                <section id='task-list' className="task-list">
                    <h1 className="center">Please Select Project</h1>
                </section>
            )
        }
    } else {
        return <h3>please sign in</h3>
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, { addProject, deleteProject, deleteTask, setSelectedProject, addTask })(TaskList);
