import ProjectList from './ProjectList';
import TaskList from './TaskList';
import { connect } from 'react-redux';

const index = ({ authStatus }) => {
    if (authStatus.isSignedIn) {
        return (
            <div className="container" id="main-content">
                <ProjectList />
                <TaskList />
            </div>
        )
    } else {
        return (
            <div className="container" id="main-content">
                <h1 className="center">Please Sign In</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(index);