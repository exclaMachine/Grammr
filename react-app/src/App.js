import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import PicturesPage from './components/pictures/Pictures'
import SplashPage from './components/Splashpage';
import AlbumsPage from './components/albums/Albums';
import PicturePage from './components/pictures/SinglePic';
import FooterLinks from './components/Footer';


import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/users/UsersList';
import User from './components/users/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <SplashPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/pictures' exact={true}>
          <PicturesPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/pictures/:id' exact={true}>
          <PicturePage/>
        </ProtectedRoute>
        <ProtectedRoute path='/albums' exact={true}>
          <AlbumsPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/noresults' exact={true}>
            <h1>Oops! There are no matches. Try to broaden your search.</h1>
        </ProtectedRoute>
        <Route path=''>
          <div className='four-oh-four'>
            <h1>404 - Does this page exist?</h1>
            <NavLink to='/'><h2>Take me home!</h2></NavLink>
          </div>
        </Route>
        <FooterLinks/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
