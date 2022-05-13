import React, {useState} from 'react'


//search bar should search for picture titles


const searchBar = () => {

    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
    }

    return (
        <>
            <input
            type='text'
            onChange={handleSearch}
            value={searchInput}
            />


        </>
    )
}
