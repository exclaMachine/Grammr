import React from "react";
// import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deletePictureThunk } from "../../store/picture";

const DeletePicture = ({id}) => {
    // const { id } = useParams();
    const dispatch = useDispatch()
    console.log('id', id)
    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    console.log('picObj', pictureObj)
    const pictures = Object.values(pictureObj)
    console.log('pics', pictures)
    console.log('sess', sessionUser)

    const idObj = pictures.filter(picture => picture?.id === id)
    const idToDelete = idObj[0].id
    console.log('idObj', idObj)

    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(deletePictureThunk(idToDelete))
    }

    return (
        // <h1>dang</h1>
        <form onSubmit={handleDelete}>

            <button type="submit">Delete Picture</button>
        </form>

    )
}

export default DeletePicture
