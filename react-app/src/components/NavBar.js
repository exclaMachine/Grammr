
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector} from 'react-redux';


const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav>
      <div>
        {!sessionUser && (
        <div>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        </div>
        )}
        {sessionUser && (
        <div>
          <li>
            <LogoutButton />
          </li>
          <NavLink to='/pictures' exact={true} activeClassName='active'>
            Pictures
          </NavLink>
        </div>
        )}
    </div>
    </nav>

  );
}

export default NavBar;
