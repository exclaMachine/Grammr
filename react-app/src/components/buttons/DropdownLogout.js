import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from "../auth/LogoutButton";

function ProfileButton() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
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
      <button onClick={openMenu}>
          Hello, {sessionUser.username}
        {/* <i className="fas fa-user-circle" /> */}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{sessionUser.username}</li>
          <li>{sessionUser.email}</li>
          <li>
            <LogoutButton/>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
