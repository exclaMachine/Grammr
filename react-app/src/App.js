import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import PicturesPage from './components/pictures/Pictures'
import UploadPicture from './components/pictures/UploadPic';
import SplashPage from './components/Splashpage';
import AlbumsPage from './components/albums/Albums';
import PicturePage from './components/pictures/SinglePic';

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
          <UploadPicture/>
          <SplashPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/pictures' exact={true}>
          <UploadPicture/>
          <PicturesPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/pictures/:id' exact={true}>
          <PicturePage/>
        </ProtectedRoute>
        <ProtectedRoute path='/albums' exact={true}>
          <AlbumsPage/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
