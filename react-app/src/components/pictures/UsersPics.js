import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserPicturesThunk } from '../../store/picture';
import './pictures.css'
// import EditPicModal from '../modals/EditPicModal'

const PicturesPage = () => {
    const dispatch = useDispatch()

    const { id } = useParams();
    const [isHidden, setHidden] = useState(false)


    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    let pictures = Object.values(pictureObj)
    console.log('usePics', pictures)

    // let usersPictures = pictures.filter(picture => picture?.user_id === sessionUser?.id).reverse()

    // const Hide = () => {
    //     setHidden(true);
    // }

    // const Show = () => {
    //     setHidden(false);
    // }

    useEffect(() => {
        dispatch(getUserPicturesThunk(+id))
    }, [dispatch])

    return (
        <>
        <div className='pic-grid'>
            <h1>{sessionUser?.username}'s Pictures</h1>
            {usersPictures.length < 1 && (
            <h2>This user doesn't have any pictures!</h2>
            )}
            <div className='picturesContainer'>
                 <div>
                     <div className='pic-list'>
                         {usersPictures.map(({ id, content, image}) => (
                             <div className="individual-pic" key={id}>
                                 {/* <h1>{content}</h1> */}
                                     <NavLink className="navBar" to={`/pictures/${id}`} exact={true} activeClassName='active'>
                                         <img alt='' src={image}></img>
                                     </NavLink>
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
