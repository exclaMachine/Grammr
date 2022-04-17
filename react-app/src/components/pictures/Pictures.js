import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
                    <ul className='pic-list'>
                        {usersPictures.map(({ id, content, image}) => (
                            <li classNamekey={id}>
                                <EditPicture id={id}/>
                                <h1>{content}</h1>
                                    <NavLink className="navBar" to={`/pictures/${id}`} exact={true} activeClassName='active'>
                                        <img className='upload' alt='' src={image}></img>
                                    </NavLink>
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
