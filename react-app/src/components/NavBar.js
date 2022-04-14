
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
          <div>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </div>

          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>


          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>


          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>

        </div>
        )}
        {sessionUser && (
        <div>

            <LogoutButton />

          <div>
            <NavLink to='/pictures' exact={true} activeClassName='active'>
              Pictures
            </NavLink>
          </div>
          <div>
            <NavLink to='/' exact={true} activeClassName='active'>
                Home
            </NavLink>
          </div>
        </div>
        )}
    </div>
    </nav>

  );
}

export default NavBar;
