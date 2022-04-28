import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbumThunk } from "../../store/album";

const DeleteAlbum = ({id}) => {
    const dispatch = useDispatch()
    // console.log('id', id)
    // const sessionUser = useSelector(state => state.session.user)
    const albumObj = useSelector(state => state.albumReducer)
    // console.log('picObj', albumObj)
    const albums = Object.values(albumObj)

    //actually i think i need to use props
    const idObj = albums.filter(album => album?.id === id)
    const idToDelete = idObj[0].id

    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(deleteAlbumThunk(idToDelete))
    }

    return (
        <form onSubmit={handleDelete}>
            <h2>Are you sure you want to delete this album and pics?</h2>
            <button type="submit">Delete Album</button>
        </form>

    )
}

export default DeleteAlbum
