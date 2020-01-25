import React, { lazy, Suspense, useContext } from 'react';
// import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { CountriesContext } from './contexts/CountriesContext';

import Loading from './components/Loading';
const Countries = lazy(() => import('./components/Countries'));
// import SignUp from './components/SignUp';
// import Login from './components/Login';

function App() {
  console.log('App rendering...');
  const data = useContext(CountriesContext);
  const { countries } = data;
  console.log(countries[118]);

  return (
    <Suspense fallback=<Loading/>>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {/* <Router>
          <Switch>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={Login}/>
            <Route path='/' component={<Countries countries={countries} />}/>
          </Switch>
        </Router> */}
        <Countries countries={countries} />      
      </div>
    </Suspense>
  );
}

export default App;
