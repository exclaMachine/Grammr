import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { getAllPicturesThunk } from '../store/picture';
//search bar should search for picture titles and then return single pic

const SearchBar = () => {
    const history = useHistory();
    const pictureObj = useSelector(state => state.pictureReducer)

    const [showMenu, setShowMenu] = useState(false);

    const closeMenuButton = () => {
        setShowMenu(false);
     }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    // let foundPic = pictures.find((pic) => {
    //     return pic.content.toLowerCase() === searchInput.toLowerCase()
    // })

    // const handleSearch = (e) => {
    //     e.preventDefault();

    //     if (foundPic?.id !== undefined) {
    //         history.push(`/pictures/${foundPic.id}`)
    //         setSearchInput('')
    //     }
    //     if (foundPic?.id === undefined) {
    //         history.push('/noresults')
    //     }

    // }

    //by having this it was interfering with the other enter and causing problems
    // let enterStrike = (e) => {
    //     document.addEventListener('keypress', e => {
    //         if (e.key === 'Enter') {
    //             return handleSearch(e)
    //         }
    //     })

    // }


    // console.log('show', showMenu)

    let pictures = Object.values(pictureObj)
    // console.log('pics for search', pictures)

    const [searchInput, setSearchInput] = useState('');

    // console.log('search', searchInput)

    let foundPictures = pictures.filter((pic) => {
        return pic.content.toLowerCase().includes(searchInput.toLowerCase())
    })


    return (
        <>
        {/* removes the search bar if it goes to a single pic. temp fix for now */}
        {/* it still gets removed if right after you go to albums */}
        {pictures.length < 2 && (
            <></>
        )}
        {pictures.length > 1 && (
        <>
            <input
            className='search-input'
            placeholder='Find a picture'
            type='search'
            onClick={openMenu}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            />

            {showMenu && (
                <div onBlur={closeMenuButton} className='search-container'>
                    <div className='search-result'>
                    {searchInput.length > 0 && foundPictures.map(pic => (
                            <a className='search-item'
                            href={`/pictures/${pic.id}`}
                            >{pic.content}</a>
                            ))}
                            </div>
                </div>

            )}



        </>
        )}
        </>
    )
}

export default SearchBar;
