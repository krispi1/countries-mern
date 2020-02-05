// Modules
import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Utilities
import logo from './logo.svg';
import './App.css';

// Contexts
// import { CountriesContext } from './contexts/CountriesContext';
import { UserContext } from './contexts/UserContext';

// Components
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import SampleLogin from './components/SampleLogin';

const CountriesList     = lazy(() => import('./components/CountriesList.js'));
const Countries         = lazy(() => import('./components/Countries'));
const Country           = lazy(() => import('./components/Country'));
const SignUp            = lazy(() => import('./components/SignUp.js'));
const SignIn            = lazy(() => import('./components/SignIn.js'));

// Components offline
// const CountriesOffline  = lazy(() => import('./components.offline/CountriesOffline.js'));
// const CountryOffline    = lazy(() => import('./components.offline/CountryOffline'));
// const CountriesListOff  = lazy(() => import('./components.offline/CountriesListOff.js')); 

function App() {
  console.log('App rendering...');
  const { user } = useContext(UserContext);
  // const { countries } = useContext(CountriesContext);
  console.log(user);
  // console.log(countries[118]);

  return (
    <Router>
    <Suspense fallback={<Loading />}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Navbar />
        <div>{user}</div>
        
        {/* For when online */}
        {/* <Countries countries={countries} /> */}
        {/* <SignIn /> */}
        {/* <Country countries={countries}/> */}
        <CountriesList />

        {/* For when offline */}
        {/* <CountriesListOffline countries={countries} /> */}

        <Switch>
          {/* Online routes */}
          <Route exact path="/" component={Countries} />
          <Route exact path="/samplelogin" component={SampleLogin} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/countries" component={Countries} />
          <Route exact path="/countries/:name" component={Country} />
          
          {/* Offline routes */}
          {/* <Route exact path="/" component={CountriesOffline} /> */}
          {/* <Route exact path="/countries/:name" component={CountryOffline} /> */}
          <Route component={Page404} />
        </Switch>
      </div>
    </Suspense>
    </Router>
  );
}

export function Page404({ location }) {
  const style404 = {
    marginTop: "30px",
    fontSize: "2.9em"
  };

  return (
    <div className="content-area">
      <h2 style={style404}>
        Sorry, we couldn't find the page you requested:
        <br />
        <code style={{ color: 'red', fontSize: '1.9em' }}>{location.pathname}</code>
      </h2>
      <br />
    </div>
  );
} // Page404

export default App;
