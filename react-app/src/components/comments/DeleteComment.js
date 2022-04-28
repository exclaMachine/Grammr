import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentThunk } from "../../store/comment";

const DeleteComment = ({id}) => {
    const dispatch = useDispatch()
    // console.log('id', id)
    // const sessionUser = useSelector(state => state.session.user)

    const commentObj = useSelector(state => state.commentReducer)

    // console.log('picObj', pictureObj)
    // console.log('picobjid', pictureObj.id)
    const comments = Object.values(commentObj)


    console.log('commss', comments)
    // console.log('sess', sessionUser)


    // console.log('idObj', idObj)

    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(deleteCommentThunk(comments[+id]?.id))
    }

    return (
        // <h1>Delete location</h1>
        <form onSubmit={handleDelete}>

            <button type="submit">Delete Comment</button>
        </form>

    )
}

export default DeleteComment
