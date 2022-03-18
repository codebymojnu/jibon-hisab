import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import AddMyDay from './components/AddMyDay/AddMyDay';
import DayDetails from './components/DayDetails/DayDetails';
import FindDay from './components/FindDay/FindDay';
import EditDay from './components/EditDay/EditDay';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthProvider from './components/context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <PrivateRoute path="/add">
            <AddMyDay />
          </PrivateRoute>
          <Route path="/find">
            <FindDay />
          </Route>
          <Route path="/edit/:id">
            <EditDay />
          </Route>
          <Route path="/day/:id">
            <DayDetails />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
