import React from "react";
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/Actions/CheckUsers';

const SignedInLinks = (props) => {

    return (
        <ul className={"right"}>
            <li><NavLink to={'/dashboard'}>Home</NavLink></li>
            <li><NavLink to={'/create'}>New Project</NavLink></li>
            <li><NavLink onClick={props.signOut} to={'/signin'}>Log Out</NavLink></li>
            {/*<li><NavLink to={'/profile'} className={'btn btn-floating'}>DB</NavLink></li>*/}
        </ul>
    )
};

const mapDispatchToProps =  (dispatch) => {
    return {
        signOut: () => dispatch (signOut())
    }
};
export default connect(null, mapDispatchToProps) (SignedInLinks);