import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPicturesThunk } from '../store/picture';
import DeletePicture from './pictures/DeletePic';

//This will show all pics from all users

const SplashPage = () => {
    const dispatch = useDispatch()

    const pictureObj = useSelector(state => state.pictureReducer)

    let allPictures = Object.values(pictureObj)

    useEffect(() => {
        dispatch(getAllPicturesThunk())
    }, [dispatch])

    return (
        <>
        <div>
            <h1>Pictures</h1>

            <div className='picturesContainer'>
                <div>
                    <ul>
                        {allPictures.map(({ id, content, image}) => (
                            <li key={id}>
                                <h1>{content}</h1>
                                <img alt='' src={image}></img>
                            </li>
                        ))}
                    </ul>

                </div>

            </div>

        </div>
        </>
    )

}

export default SplashPage
