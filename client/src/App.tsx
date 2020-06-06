import React from 'react';
import './App.css';
import NavbarComponent from './components/navbar.component';
import { AccountComponent } from './components/accounts.component';
import { LoanComponent } from './components/loan.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomeComponent } from './components/home.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <main>
          <Switch>
            <Route path="/home">
              <HomeComponent />
            </Route>
            <Route path="/accounts">
              <AccountComponent />
            </Route>
            <Route path="/loans">
              <LoanComponent />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
