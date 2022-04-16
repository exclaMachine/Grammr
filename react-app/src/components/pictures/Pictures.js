import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPicturesThunk } from '../../store/picture'
import DeletePicture from './DeletePic';
import EditPicture from './EditPic';
import './pictures.css'

const PicturesPage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)

    // console.log('obj', pictureObj)
    let pictures = Object.values(pictureObj)

    let usersPictures = pictures.filter(picture => picture?.user_id === sessionUser?.id)


    useEffect(() => {
        dispatch(getAllPicturesThunk())
    }, [dispatch])

    return (
        <>
        <div>
            <h1>Pictures</h1>

            <div className='picturesContainer'>
                <div>
                    <ul className='one-pic'>
                        {usersPictures.map(({ id, content, image}) => (
                            <li key={id}>
                                <EditPicture id={id}/>
                                <h1>{content}</h1>
                                <img className='upload' alt='' src={image}></img>
                                <DeletePicture id={id}/>
                            </li>
                        ))}
                    </ul>

                </div>

            </div>

        </div>
        </>
    )
}

export default PicturesPage;
