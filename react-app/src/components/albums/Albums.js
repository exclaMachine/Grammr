import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbumsThunk } from '../../store/album'
import CreateAlbum from './CreateAlbum';
import EditAlbum from './EditAlbum';
import AlbumsPicturesPage from '../albumsPics/AlbumsPics';
import DeleteAlbum from './DeleteAlbum';
import './albums.css'
import AlbumButton from '../buttons/AlbumDropdown';

const AlbumsPage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const albumObj = useSelector(state => state.albumReducer)

    console.log('obj', albumObj)
    let albums = Object.values(albumObj)

    let usersAlbums = albums.filter(album => album?.user_id === sessionUser?.id)
    console.log('users', usersAlbums)

    useEffect(() => {
        dispatch(getAllAlbumsThunk())
    }, [dispatch])

    return (
        <>
        <div className='albums-container'>
            <h1>Albums</h1>
            {/* <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> */}
            <div >
                <div>
                    <ul>
                        {usersAlbums.map(({ id, title}) => (
                            <li className='album-container' key={id}>
                                {/* <EditPicture id={id}/> */}
                                <AlbumButton id={id}/>
                                {/* <h1>{title}</h1> */}
                                {/* <DeletePicture id={id}/> */}
                                {/* <EditAlbum id={id} title={title}/>
                                <AlbumsPicturesPage id={id}/>
                                <DeleteAlbum id={id}/> */}
                            </li>
                        ))}
                    </ul>

                </div>
                        <CreateAlbum/>

            </div>

        </div>
        </>
    )
}

export default AlbumsPage;
