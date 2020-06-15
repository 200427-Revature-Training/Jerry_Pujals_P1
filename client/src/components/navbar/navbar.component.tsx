import React, { useState } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './navbar.component.css';
import { User } from '../../models/User';

/*
import { AccountComponent } from './components/accounts/accounts.component';
import { UserComponent } from './components/user/user.component';                                        
import { LoginComponent } from './components/login/login.component';
import { ManagerComponent } from './components/manager/manager.component';
*/
export const childViews = {
    login: 'LOGIN',
    register: 'REGISTER'
};

const NavbarComponent: React.FC<RouteComponentProps> = (props) => {

    const renderOnCurrentPath = (path: string) => {
        console.log(props.location.pathname);


        return path === props.location.pathname ? 
        <span className="sr-only">(current)</span> : <span></span>
    }

    //Function that takes a view string input and returns the child page
/*
    const [view, setView] = useState<'STUDENT_LIST' | 'REGISTER'>('STUDENT_LIST');
    const getCurrentView = () => {

        // Returning a view based on the value of the state 'view'
        switch (view) {
            case childViews.studentList: return <StudentListComponent students={students} setView={setView} />;
            case childViews.register: return <RegisterComponent setView={setView} addStudent={addStudent} />
            default: return <React.Fragment />
        }
    }
*/
const testuser: User = {
    id: 20,
    userName: "inputUserName",
    password: "inputPassword",
    firstName: 'John',
     lastName: 'Johnson',
     email: 'bruh',
     roleId: 2
};
const [user, setUser] = useState<User>(testuser);

const test = "this is a stance";
    return (
        <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" href="#">ERS System</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                        <Link to={{pathname:'/login', state: {user}}}>Login {renderOnCurrentPath('/login') }</Link>
                    </li>
                              

                </ul>
            </div>
        </nav>
    )
}



/* Higher Order Component */
/* If you need access to the history object and you're not getting it directly from the Router
    then wrapping the component in a withRouter call and exporting that (rather than the component itself)
    can give you convenient access to it. The history object originates with the Router and provides an interface
    for us to programmatically interact with the history and navigation. */
export default withRouter(NavbarComponent);