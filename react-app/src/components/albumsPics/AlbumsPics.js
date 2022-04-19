import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPicturesThunk } from '../../store/picture'
import DeletePicture from '../pictures/DeletePic'
import EditPicture from '../pictures/EditPic';
import UploadPicture from '../pictures/UploadPic';


const AlbumsPicturesPage = ({id}) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    const albumObj = useSelector(state => state.albumReducer)

    let specificAlbum = albumObj[+id]
    console.log('spec', specificAlbum.updated_at)
    // let albums = Object.values(albumObj)

    let pictures = Object.values(pictureObj)
    let usersPictures = pictures.filter(picture => picture?.user_id === sessionUser?.id && picture?.album_id === +id)
    // console.log('alpic', usersPictures)

    useEffect(() => {
        dispatch(getAllPicturesThunk())
    }, [dispatch])

    return (
        <>
        <div>
            <h1>Pictures in {specificAlbum.title}</h1>
            {/* <h2>{specificAlbum.created_at}</h2> */}
            <div className='picturesContainer'>
                <div>
                    <UploadPicture id={id}/>
                    <ul>
                        {usersPictures.map(({ id, album_id, content, image}) => (
                            <li key={id}>

                                <EditPicture id={id}/>
                                <h1>{content}</h1>
                                    <NavLink className="navBar" to={`/pictures/${id}`} exact={true} activeClassName='active'>
                                        <img alt='' src={image}></img>
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

export default AlbumsPicturesPage;
