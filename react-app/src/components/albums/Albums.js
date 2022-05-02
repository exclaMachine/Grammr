import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbumsThunk } from '../../store/album'
import CreateAlbum from './CreateAlbum';
import EditAlbum from './EditAlbum';
import './albums.css'
import AlbumButton from '../buttons/AlbumDropdown';
import DeleteModal from '../modals/DeleteModal';

const AlbumsPage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const albumObj = useSelector(state => state.albumReducer)

    let albums = Object.values(albumObj)

    let usersAlbums = albums.filter(album => album?.user_id === sessionUser?.id)

    useEffect(() => {
        dispatch(getAllAlbumsThunk())
    }, [dispatch])

    return (
        <>
        <CreateAlbum/>
        <div className='albums-container'>
            <h1>Albums</h1>
            <div >
                <div>
                    <ul>
                        {usersAlbums.map(({ id, title}) => (
                            <li className='album-container' key={id}>
                                <span><AlbumButton id={id}/></span>
                                <EditAlbum id={id} title={title}/>
                                <DeleteModal id={id}/>
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
