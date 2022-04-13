import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllPicturesThunk } from '../store/picture'


const PicturesPage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)

    console.log('obj', pictureObj)
    // pictures = Object.values(pictureObj)

    // let usersPictures = pictures.filter(picture => picture?.user_id === sessionUser?.id)


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
                        {/* {usersPictures.map(({ id, content, image}) => (
                            <li key={id}>
                                <h1>{content}</h1>
                            </li>
                        ))} */}
                    </ul>

                </div>

            </div>

        </div>
        </>
    )
}

export default PicturesPage;
