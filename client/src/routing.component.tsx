import React, { useState } from 'react';
import { Route, Link, Redirect, useLocation } from 'react-router-dom';

import LoginComponent from './user/login.component';
import TrmssComponent from './trms/trmss.component';
import userService from './user/user.service';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions';
import { UserState } from './reducer';
import { User } from './user/user';
import  AddTrmsComponent from './trms/add.trms.component';
import  DeleteTrmsComponent from './trms/delete.trms.component';
import  UpdateTrmsComponent from './trms/update.trms.component';
import  ApproveTrmsComponent from './trms/approve.trms.component';


export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const [isNavOpen, setIsNavOpen] = useState(false);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const location = useLocation();
    function logout() {
        userService.logout().then(() => {
            dispatch(getUser(new User()));
        });
    }
    return (
        <div className='container-fluid'>
            <nav className="navbar navbar-expand-sm routing-nav">
            <div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    onClick ={() => setIsNavOpen(!isNavOpen)}>
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavOpen ? '' : 'collapse' } navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link  className='nav-link' to='/addTrms' > Create Form    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/trmss' className='nav-link'> View All Forms    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/' className='nav-link' > Login/Logout    </Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
            <div>
                <Route exact path='/' component={LoginComponent} />
                <Route exact path='/trmss' component={TrmssComponent} />
                <Route exact path='/addTrms' component={AddTrmsComponent} />
                <Route exact path='/trmss/:nam/:dt/delete' component={DeleteTrmsComponent} />
                <Route exact path='/trmss/:nam/:dt/update' component={UpdateTrmsComponent} />
                <Route exact path='/trmss/:nam/:dt/approve' component={ApproveTrmsComponent}/>           
            </div>

        </div>

    );
}