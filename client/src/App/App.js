import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../components/Authentification';
import { HomePage } from '../HomePage';
import { RegisterPage } from '../RegisterPage';
import Dashboard from 'views/Dashboard';
import Admin from 'layouts/Admin';
 import {LoginPage} from "LoginPage"
 import AdminLayout from "layouts/Admin.js";
import TableList from 'views/TableList';


function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
         
        <Switch>

        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" component={RegisterPage } />
        <Redirect exact from="/" to="/admin" />
        <PrivateRoute  path="/admin" component={AdminLayout}  />



      {/*  <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
       <Redirect from="*" to="/" />

        <Redirect from="/" to="/admin/dashboard" />*/}
        </Switch>
          
    );
}

export { App };