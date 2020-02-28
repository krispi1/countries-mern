// Modules
import React, { lazy, Suspense, useContext } from 'react';
import { 
  BrowserRouter as Router, 
  Route, Switch
} from 'react-router-dom';

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
import ViewUser from './components/User-ViewOne';
import Users from './components/User-ViewAll';
import Notes from './components/Note-ViewAll';
import PrivateRoute from './components/PrivateRoute';

const CountriesList     = lazy(() => import('./components/CountriesList'));
const Countries         = lazy(() => import('./components/Countries'));
const Country           = lazy(() => import('./components/Country'));
const SignUp            = lazy(() => import('./components/SignUp'));
const SignIn            = lazy(() => import('./components/SignIn'));
const Goodies           = lazy(() => import('./components/Goodies'));
const Footer            = lazy(() => import('./components/Footer'));


function App() {
  console.log('App rendering...');
  const { user } = useContext(UserContext);
  
  return (
    <Router>
    <Suspense fallback={<Loading />}>
    <div>
      <header className="App-header">
        <div className="smiley">{`:-)`}</div>
        <img src={logo} className="App-logo" alt="logo" />
        <span id="userSpan" className="user-span">{ user }</span>
      </header>
      <Navbar />

      <div className="App-body">
      
      <CountriesList />

      <Switch>
        <Route exact path="/" component={Countries}/>
        <Route exact path="/samplelogin" >
          <SampleLogin />
        </Route>
        <PrivateRoute path="/goodies">
          <Goodies />
        </PrivateRoute>
        <Route exact path="/signin" >
          <SignIn />
        </Route>
        <Route exact path="/signup" >
          <SignUp />
        </Route>
        <Route exact path="/countries" component={Countries} />
        <Route exact path="/countries/:name" component={Country} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:username" component={ViewUser} />
        <Route exact path="/notes" component={Notes} />
        
        <Route component={Page404} />
        </Switch>
      </div>
    </div>
    <Footer />
    </Suspense>
    </Router>
  ); // return
} // App

export function Page404({ location }) {
  const style404 = {
    marginTop: "30px",
    fontSize: "1.7em"
  };

  return (
    <div className="content-area">
      <div style={style404}>
        Sorry, we couldn't find the page you requested:
        <br />
        <code style={{ 
          color: 'red', fontSize: '1.1em', 
          fontWeight: '800' 
        }}>{location.pathname}</code>
      </div>
      <br />
    </div>
  );
} // Page404

export default App;
