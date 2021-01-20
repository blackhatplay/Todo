import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import { useState } from 'react';
import { addProject, deleteProject, setSelectedProject, fetchTasks, reOrder } from '../../actions/fetch';
import { PROJECTS } from '../../types';

const ProjectList = ({ authStatus, projects, addProject, deleteProject, setSelectedProject, fetchTasks, reOrder, lastProjectOrderId }) => {

    const [input, setInput] = useState('');

    const itemOne = useRef(0);

    const getTasks = (obj) => {
        setSelectedProject(obj);
        fetchTasks(authStatus.userDetails.userId, obj.id)
    }

    const deleteProjectCompFunc = async (key) => {
        deleteProject(authStatus.userDetails.userId, key);
    }

    const dragStart = (e, key) => {
        itemOne.current = key;
        e.target.classList.add('dragging');
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnd = (e) => {
        e.target.classList.remove("dragging");
        e.target.classList.remove('drag-to');
    }
    const dragEnter = (e) => {
        e.target.classList.add('drag-to');
    }

    const dragLeave = (e) => {
        e.target.classList.remove('drag-to');
    }

    const onDrop = (e, itemOne, itemTwo) => {
        reOrder(itemOne, itemTwo, PROJECTS)
        e.target.classList.remove('drag-to');
    }


    const renderedItems = Object.keys(projects).map((key) => {
        return (
            <li
                draggable={true}
                onDragStart={(e) => dragStart(e, key)}
                onDragEnter={dragEnter} onDragLeave={dragLeave}
                onDragEnd={dragEnd}
                onDrop={(e) => onDrop(e, { id: projects[itemOne.current].id, order: key }, { id: projects[key].id, order: itemOne.current })}
                onClick={() => getTasks(projects[key])}
                key={key}
                className="dragable"
                data-id={key}
            >
                <span>
                    <FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon>{projects[key].title}
                </span>
                <button onClick={() => deleteProjectCompFunc(projects[key].id)}>
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </button>
            </li>
        )
    })

    const onInputChnage = (e) => {
        setInput(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (input) {
            addProject({
                title: input,
                userId: authStatus.userDetails.userId,
                order: lastProjectOrderId + 1
            })
        }
        setInput('');
    }

    if (authStatus.isSignedIn) {
        return (
            <section id='project-list' className='project-list'>
                <h1>{authStatus.userDetails.name}</h1>

                <h4>Projects</h4>
                <ul onDragOver={dragOver}>
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
export default connect(mapStateToProps, { addProject, deleteProject, setSelectedProject, fetchTasks, reOrder })(ProjectList);