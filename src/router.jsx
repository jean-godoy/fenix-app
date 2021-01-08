import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom';
import './components/Pikasso/Global.css';

//login
import Login from './pages/Login/Login';
import Logout from './pages/Login/Logout';

import Home from './pages/Home/Home';

export default props => {

    return(
        <div className="boat">
            <BrowserRouter>
                <Switch>

                    <Route exact path="/" component={Home} />

                    {/* Login & Logout */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />

                </Switch> 
            </BrowserRouter>
        </div>
    );
}