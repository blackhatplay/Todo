import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import { useRef, useState } from 'react';
import { addTask, deleteTask, reOrder } from '../../actions/fetch';
import { TASKS } from '../../types';

const TaskList = ({ authStatus, tasks, selectedProject, addTask, deleteTask, lastTaskOrderId, reOrder }) => {
    const [input, setInput] = useState('');

    const itemOne = useRef(0);


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
        reOrder(itemOne, itemTwo, TASKS)
        e.target.classList.remove('drag-to');
    }

    const renderedItems = Object.keys(tasks).map((key) => {
        return (
            <li
                key={key}
                draggable={true}
                onDragStart={(e) => dragStart(e, key)}
                onDragEnter={dragEnter} onDragLeave={dragLeave}
                onDragEnd={dragEnd}
                onDrop={(e) => onDrop(e, { id: tasks[itemOne.current].id, order: key }, { id: tasks[key].id, order: itemOne.current })}
                className="dragable"
            >
                <span>
                    <FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon>{tasks[key].title}
                </span>
                <button onClick={() => deleteTask(key)}>
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </button>
            </li>
        )
    })

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        addTask({
            title: input,
            userId: authStatus.userDetails.userId,
            postId: selectedProject.id,
            order: lastTaskOrderId + 1
        });
        setInput('');
    }

    if (authStatus.isSignedIn) {
        if (selectedProject.id) {
            return (
                <section id='task-list' className="task-list">
                    <h1>{selectedProject.title}</h1>

                    <h4>Tasks</h4>
                    <ul onDragOver={dragOver}>
                        {renderedItems}
                    </ul>
                    <form onSubmit={onFormSubmit}>
                        <input onChange={onInputChange} value={input} placeholder="Add new task" type="text" />
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

export default connect(mapStateToProps, { deleteTask, addTask, reOrder })(TaskList);
