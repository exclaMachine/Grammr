import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getAllPicturesThunk } from '../store/picture';
//search bar should search for picture titles and then return single pic

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const pictureObj = useSelector(state => state.pictureReducer)

    useEffect(() => {
        dispatch(getAllPicturesThunk())
    }, [dispatch])

    let pictures = Object.values(pictureObj)
    console.log('pics for search', pictures)

    const [searchInput, setSearchInput] = useState('');

    console.log('search', searchInput)



    let foundPic = pictures.find((pic) => {
        return pic.content.toLowerCase() === searchInput.toLowerCase()
    })

    const handleSearch = (e) => {
        e.preventDefault();

        if (foundPic?.id !== undefined) {
            history.push(`/pictures/${foundPic.id}`)
            setSearchInput('')
        }

    }

    //by having this it was interfering with the other enter and causing problems
    // let enterStrike = (e) => {
    //     document.addEventListener('keypress', e => {
    //         if (e.key === 'Enter') {
    //             return handleSearch(e)
    //         }
    //     })

    // }


    return (
        <>
        <form onSubmit={handleSearch}>
            <input
            type='text'
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            />

            <h1>{foundPic?.id}</h1>
            <button type='submit'>Search</button>
        </form>
        </>
    )
}

export default SearchBar;
