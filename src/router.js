import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
import Common from './common';
import OrderDetail from './pages/order/detail';
import User from './pages/user/index'

export default class IRouter extends Component{
  render(){
    return(
      <Router>
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
                <Route path="/admin/user" component={User} />
                <Route component={NoMatch} />
              </Switch>
            </Admin>
          } />
          <Router path="/common" render={() => 
            <Common>
              <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
            </Common>
          }/>
        </App>
      </Router>
    )
  }
}