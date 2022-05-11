import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPicturesThunk } from '../../store/picture'
import './pictures.css'
import UploadPicture from './UploadPic';
import DeletePicModal from '../modals/DeletePicModal'
// import EditPicModal from '../modals/EditPicModal'
import EditPicture from './EditPic';

const PicturesPage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
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
            {usersPictures.length < 1 && (
            <h2>You need pictures! Start uploading some!</h2>
            )}
            <div className='picturesContainer'>
                 <div>
                     <div className='pic-list'>
                         {usersPictures.map(({ id, content, image}) => (
                             <div className="individual-pic" key={id}>
                                 <EditPicture id={id}/>
                                 {/* <EditPicModal id={id}/> */}
                                 {/* <h1>{content}</h1> */}
                                     <NavLink className="navBar" to={`/pictures/${id}`} exact={true} activeClassName='active'>
                                         <img alt='' src={image}></img>
                                     </NavLink>
                                    <div>
                                     <DeletePicModal id={id}/>
                                     </div>
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
