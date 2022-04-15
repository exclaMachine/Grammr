import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbumsThunk } from '../store/album'
import CreateAlbum from './CreateAlbum';
import EditAlbum from './EditAlbum';

const AlbumsPage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const albumObj = useSelector(state => state.albumReducer)

    // console.log('obj', albumObj)
    let albums = Object.values(albumObj)

    let usersAlbums = albums.filter(album => album?.user_id === sessionUser?.id)


    useEffect(() => {
        dispatch(getAllAlbumsThunk())
    }, [dispatch])

    return (
        <>
        <div>
            <h1>Albums</h1>

            <div className='albumsContainer'>
                <div>
                    <ul>
                        {usersAlbums.map(({ id, title}) => (
                            <li key={id}>
                                {/* <EditPicture id={id}/> */}
                                <h1>{title}</h1>
                                {/* <DeletePicture id={id}/> */}
                                <EditAlbum id={id} title={title}/>
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
