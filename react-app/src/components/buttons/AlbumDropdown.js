import React, { useState} from "react";
import { useSelector } from 'react-redux';
import AlbumsPicturesPage from "../albumsPics/AlbumsPics";

function AlbumButton({id}) {
  // const sessionUser = useSelector(state => state.session.user)
  const albumObj = useSelector(state => state.albumReducer)

  const album = albumObj[+id]

  const [showMenu, setShowMenu] = useState(false);

  const closeMenuButton = () => {
      setShowMenu(false);
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = () => {
//       setShowMenu(false);
//     };

//     // document.addEventListener('click', closeMenu);

//     // return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

  return (
    <>
    {!showMenu && (


      <button onClick={openMenu}>

          Open <u>{album.title}</u>
      </button>
    )}
        {showMenu && (
            //   <h1>stuff</h1>
            <ul className="album-dropdown">
                <button onClick={closeMenuButton}>Close <u>{album.title}</u> Album</button>
                <AlbumsPicturesPage id={id}/>
                {/* <li>{sessionUser.username}</li> */}
            </ul>
        )}
    </>
  );
}

export default AlbumButton;
