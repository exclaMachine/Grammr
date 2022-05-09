import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPicturesThunk } from '../../store/picture'
import DeletePicModal from '../modals/DeletePicModal'
import EditPicModal from '../modals/EditPicModal'
import UploadPicture from '../pictures/UploadPic';
import DeletePicture from '../pictures/DeletePic';
import EditPicture from '../pictures/EditPic';
import './albumsPics.css'

const AlbumsPicturesPage = ({id}) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    const albumObj = useSelector(state => state.albumReducer)

    let specificAlbum = albumObj[+id]
    // console.log('spec', specificAlbum.updated_at)
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
            <h3 className='albumTitle'>Pictures in <u><em>{specificAlbum.title}</em></u> ({usersPictures.length})</h3>
            {/* <h2>{specificAlbum.created_at}</h2> */}
            <div>
                <div>
                    <UploadPicture id={id}/>
                    <div className='picturesContainer'>
                        {usersPictures.map(({ id, album_id, content, image}) => (
                            <div key={id}>

                                {/* <EditPicture id={id}/> */}
                                <EditPicModal id={id}/>
                                <h1>{content}</h1>
                                    <NavLink className="navBar" to={`/pictures/${id}`} exact={true} activeClassName='active'>
                                        <img alt='' src={image}></img>
                                    </NavLink>
                                <DeletePicModal id={id}/>
                                {/* <DeletePicture id={id}/> */}
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
        </>
    )
}

export default AlbumsPicturesPage;
