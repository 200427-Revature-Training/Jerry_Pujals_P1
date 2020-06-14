import React from 'react';
import './App.css';
import NavbarComponent from './components/navbar/navbar.component';
import { AccountComponent } from './components/accounts/accounts.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  UserComponent  from './components/user/user.component';                                        
import  LoginComponent  from './components/login/login.component';
import  ManagerComponent  from './components/manager/manager.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <main>
          <Switch>
          <Route path="/manager">
              <ManagerComponent />
            </Route>
          <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/user">
              <UserComponent />
            </Route>
           
            <Route path="/accounts">
              <AccountComponent />
            </Route>
            
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
