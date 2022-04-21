import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPicturesThunk } from '../../store/picture'
import DeletePicture from './DeletePic';
import EditPicture from './EditPic';
import './pictures.css'
import UploadPicture from './UploadPic';
import DeleteModal from '../modals/DeleteModal'

const PicturesPage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    console.log('sess', sessionUser)
    // console.log('obj', pictureObj)
    let pictures = Object.values(pictureObj)

    let usersPictures = pictures.filter(picture => picture?.user_id === sessionUser?.id).reverse()


    useEffect(() => {
        dispatch(getAllPicturesThunk())
    }, [dispatch])

    return (
        <>
        <UploadPicture/>
        <div className='pic-grid'>
            <h1>{sessionUser?.username}'s Pictures</h1>

            <div className='picturesContainer'>
                <div>
                    <div className='pic-list'>
                        {usersPictures.map(({ id, content, image}) => (
                            <div classNamekey={id}>
                                <EditPicture id={id}/>
                                <h1>{content}</h1>
                                    <NavLink className="navBar" to={`/pictures/${id}`} exact={true} activeClassName='active'>
                                        <img alt='' src={image}></img>
                                    </NavLink>
                                {/* <DeleteModal id={id}/> */}
                                <DeletePicture id={id}/>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
        </>
    )
}

export default PicturesPage;
