import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { getAllPicturesThunk } from '../store/picture';
//search bar should search for picture titles and then return single pic

const SearchBar = () => {
    const dispatch = useDispatch()

    const pictureObj = useSelector(state => state.pictureReducer)

    let pictures = Object.values(pictureObj)
    console.log('pics for search', pictures)

    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)

    }
    console.log('search', searchInput)


    const foundPic = pictures.find((pic) => {
            return pic.content === searchInput
        })


    // useEffect(() => {
    //     dispatch(getAllPicturesThunk())
    // }, [dispatch])



    return (
        <>
            <input
            type='text'
            onChange={handleSearch}
            value={searchInput}
            />

        <h1>{foundPic?.id}</h1>

        </>
    )
}

export default SearchBar;
