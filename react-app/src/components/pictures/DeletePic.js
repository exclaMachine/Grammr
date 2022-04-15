import React from "react";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePictureThunk } from "../../store/picture";

const DeletePicture = ({id}) => {
    const dispatch = useDispatch()
    // console.log('id', id)
    // const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    // console.log('picObj', pictureObj)
    const pictures = Object.values(pictureObj)

    //actually i think i need to use props
    const idObj = pictures.filter(picture => picture?.id === id)
    const idToDelete = idObj[0].id

    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(deletePictureThunk(idToDelete))
    }

    return (
        <form onSubmit={handleDelete}>

            <button type="submit">Delete Picture</button>
        </form>

    )
}

export default DeletePicture
