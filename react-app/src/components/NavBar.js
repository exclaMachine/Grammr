
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector} from 'react-redux';
import './navBar.css'
import FooterLinks from './Footer';
import ProfileButton from './buttons/DropdownLogout';


const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user)

  return (
    <div className='container'>


      <nav>
        <div>
          {!sessionUser && (
          <div className='navbar-container'>
            {/* <div>
              <NavLink to='/' exact={true} activeClassName='active'>
                Grammr
              </NavLink>
            </div> */}

            <NavLink className="navBar" to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>


            <NavLink className="navBar" to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>


            {/* <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink> */}

          </div>
          )}
          {sessionUser && (
          <div className="navbar-container">


            <div>
              <NavLink className="navBar" to='/' exact={true} activeClassName='active'>
                  Grammr
              </NavLink>
            </div>
            <div>
              <NavLink className="navBar" to='/pictures' exact={true} activeClassName='active'>
                Pictures
              </NavLink>
            </div>

            <div>
              <NavLink className="navBar" to='/albums' exact={true} activeClassName='active'>
                Albums
              </NavLink>
            </div>
              {/* <LogoutButton /> */}
              <ProfileButton/>

          </div>
          )}
      </div>
      </nav>
      <footer>
            <FooterLinks/>
      </footer>
    </div>
  );
}

export default NavBar;
