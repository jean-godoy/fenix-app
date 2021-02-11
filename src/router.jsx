import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './components/Pikasso/Global.css';

//checking authentication
import { isAuthenticated } from './components/auth';

//login
import Login from './pages/Login/Login';
import Logout from './pages/Login/Logout';

//home
import Home from './pages/Home/Home';

//ordem producao
import OrdemProducao from './pages/OP/OrdemProducao';
import OrdemProducaoDetalhes from './pages/OP/OpDetails';

export default props => {

    const PrivateRoute = ({ component: Component, ...rest }) => ( <
        Route {...rest }
        render = {
            (props) =>
            isAuthenticated() ? ( <
                Component {...props }
                />
            ) : ( <
                Redirect to = {
                    { pathname: "/login", state: { from: props.location } } }
                />
            )
        }
        />
    )

    return(
        <div className="boat">
            <BrowserRouter>
                <Switch>

                    <PrivateRoute exact path="/" component={Home} />

                    {/* Login & Logout */}
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/logout" component={Logout} />

                    {/* Ordem Producao */}
                    <PrivateRoute exact path="/ordem-producao" component={OrdemProducao} />
                    <PrivateRoute exact path="/ordem-producao/detalhes/:id" component={OrdemProducaoDetalhes} />

                </Switch> 
            </BrowserRouter>
        </div>
    );
}