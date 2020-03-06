import React, {Component} from "react";
import {connect} from 'react-redux';
import {createProject} from "../../store/Actions/projectActions";
import {Redirect} from "react-router-dom";

class CreateItem extends Component {
    state = {
        project: '',
        description: ''
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    handleSubmit = (e) => {
        const {auth} = this.props;

        e.preventDefault();
        console.log(this.state);
        this.props.createProject(this.state, auth.uid);
    };
    render() {
        const {auth} = this.props;
        if (!auth.uid) return <Redirect to={'/signin'}/>;

        return (
            <div className={"container"}>
                <form onSubmit={this.handleSubmit} className={"white"}>
                    <h5 className={"grey-text text-darken-3"}>Create Project</h5>
                    <div className={"input-field"}>
                        <label htmlFor={"project"}>Project Title</label>
                        <input type={"text"} id={"project"} onChange={this.handleChange} required/>
                    </div>
                    <div className={"input-field"}>
                        <label htmlFor={"description"}>Project Description</label>
                        <input type={"text"} id={"description"} onChange={this.handleChange} required/>
                    </div>
                    <div className={"input-field"}>
                        <button className={"btn pink lighten-1 z-depth0"}>Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project, uid) => dispatch (createProject(project, uid))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (CreateItem);