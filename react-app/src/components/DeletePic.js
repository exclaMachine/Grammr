import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePictureThunk } from "../store/picture";

const DeletePicture = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)

    pictures = Object.values(pictureObj)

    //actually i think i need to use props
    idToDelete = pictures.filter(picture => picture.id === sessionUser.id)

    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(deletePictureThunk(idToDelete))
    }

    return (
        <form onSubmit={handleDelete}>

            <button type="submit">Delete</button>
        </form>

    )
}

export default DeletePicture
