import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import LogoutButton from "../auth/LogoutButton";
import './Logoutbutton.css'

function ProfileButton() {
  const sessionUser = useSelector(state => state.session.user)
  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

  return (
    <>
      <button className='hello-button' onClick={openMenu}>
          Hello, {sessionUser.username}
        {/* <i className="fas fa-user-circle" /> */}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <li>{sessionUser.username}</li> */}
          {/* <li>{sessionUser.email}</li> */}
          <div>
            <LogoutButton/>
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
