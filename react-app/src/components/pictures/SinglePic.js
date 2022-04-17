import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPicturesThunk } from '../../store/picture'
import DeletePicture from './DeletePic';
import EditPicture from './EditPic';
import './pictures.css'

const PicturePage = () => {
    const dispatch = useDispatch()
    const { id } = useParams();

    console.log('param id', id)

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)

    let pictures = Object.values(pictureObj)
    console.log("pic", pictures)

    //remember to add the plus
    let userPic = pictures.filter(picture => picture?.id === +id)[0]

    // let userPicture = pictures[id-1]. This causes a problem when you delete pictures
    console.log('userPic', userPic)

    useEffect(() => {
        dispatch(getAllPicturesThunk())
    }, [dispatch])

    return (
        <>
        <div>
            <h1>{userPic?.content}</h1>

            <div className='picturesContainer'>
                <div>
                    <img src={`${userPic?.image}`}></img>

                </div>

            </div>

        </div>
        </>
    )
}

export default PicturePage;
