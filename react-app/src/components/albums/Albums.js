import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbumsThunk } from '../../store/album'
import CreateAlbum from './CreateAlbum';
import EditAlbum from './EditAlbum';
// import AlbumsPicturesPage from '../albumsPics/AlbumsPics';
import DeleteAlbum from './DeleteAlbum';
import './albums.css'
import AlbumButton from '../buttons/AlbumDropdown';
import DeleteModal from '../modals/DeleteModal';

const AlbumsPage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const albumObj = useSelector(state => state.albumReducer)

    // console.log('obj', albumObj)
    let albums = Object.values(albumObj)

    let usersAlbums = albums.filter(album => album?.user_id === sessionUser?.id)
    // console.log('users', usersAlbums)

    useEffect(() => {
        dispatch(getAllAlbumsThunk())
    }, [dispatch])

    return (
        <>
        <CreateAlbum/>
        <div className='albums-container'>
            <h1>Albums</h1>
            {/* <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> */}
            <div >
                <div>
                    <ul>
                        {usersAlbums.map(({ id, title}) => (
                            <li className='album-container' key={id}>
                                <AlbumButton id={id}/>
                                <EditAlbum id={id} title={title}/>
                                <DeleteModal id={id}/>
                                {/* <DeleteAlbum id={id}/> */}
                            </li>
                        ))}
                    </ul>

                </div>

            </div>

        </div>
        </>
    )
}

export default AlbumsPage;
