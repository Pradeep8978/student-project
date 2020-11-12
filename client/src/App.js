/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';
import AdminLayout from "layouts/Admin.js";
import LoginPage from "./containers/auth/Login";
import RegisterPage from "./containers/auth/Register";
import Header from "./components/Header/Header";

const hist = createBrowserHistory();

function PrivateRoute({ component: Component, ...rest }) {
  console.log(store.getState())
  const { token } = store.getState().auth;
  return (
    <Route
      {...rest}
      render={({ location }) =>
      token ? (
          <Component {...rest}/>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const App = () => {
  return (
    <Provider store={store}>
  <BrowserRouter history={hist}>
      {/* <Header/> */}
    <Switch>
    <Route exact path="/login" component={LoginPage}/>
    <PrivateRoute exact path="/register" component={RegisterPage}/>

      <PrivateRoute path="/admin" component={AdminLayout} />
      {/* <Redirect to="/admin/dashboard" /> */}
    </Switch>
  </BrowserRouter>
  </Provider>
  )}

export default App;
