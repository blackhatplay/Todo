import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import { useState } from 'react';
import { addProject, deleteProject, setSelectedProject, setSelectedTask, fetchTasks, deleteTask } from '../../actions/fetch';

const ProjectList = ({ authStatus, projects, addProject, deleteProject, setSelectedProject, setSelectedTask, fetchTasks, deleteTask }) => {
    const [input, setInput] = useState('');

    const getTasks = (obj) => {
        setSelectedProject(obj);
        fetchTasks(authStatus.userDetails.userId, obj.id)
    }

    const deleteProjectCompFunc = async (key) => {
        deleteProject(authStatus.userDetails.userId, key);
    }

    const renderedItems = Object.keys(projects).map((key) => {
        return <li onClick={() => getTasks(projects[key])} key={key}><span>{projects[key].title}</span><button onClick={() => deleteProjectCompFunc(key)}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button></li>
    })

    const onInputChnage = (e) => {
        setInput(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (input) {
            addProject({
                title: input,
                userId: authStatus.userDetails.userId
            })
        }
        setInput('');
    }

    if (authStatus.isSignedIn) {
        return (
            <section id='project-list' className='project-list'>
                <h1>{authStatus.userDetails.name}</h1>

                <h4>Projects</h4>
                <ul>
                    {renderedItems}
                </ul>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onInputChnage} value={input} placeholder="Add new Project" type="text" />
                    <button type="submit"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                </form>
            </section>
        )
    } else {
        return <h3>please sign in</h3>
    }

}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps, { addProject, deleteProject, setSelectedProject, setSelectedTask, fetchTasks, deleteTask })(ProjectList);