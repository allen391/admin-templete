import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './app';
import Admin from './admin';
import Login from '../src/pages/login/login';
import Button from './pages/ui/button';
import NoMatch from '../src/pages/noMatch/index';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import City from './pages/city/index';
import Order from './pages/order/index';

export default class IRouter extends Component{
  render(){
    return(
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/admin" render={() => 
            <Admin>
              <Switch>
                <Route path="/admin/ui/buttons" component={Button} />
                <Route path="/admin/form/login" component={FormLogin} />
                <Route path="/admin/form/register" component={FormRegister} />
                <Route path="/admin/table/basic" component={BasicTable} />
                <Route path="/admin/city" component={City} />
                <Route path="/admin/order" component={Order} />
                <Route component={NoMatch} />
              </Switch>
            </Admin>
          } />
        </App>
      </HashRouter>
    )
  }
}