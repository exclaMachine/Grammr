import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCommentThunk } from "../../store/comment";

const EditComment = ({id}) => {
    const dispatch = useDispatch()

    // console.log('just id', id)

    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.commentReducer)
    const pictureObj = useSelector(state => state.pictureReducer.picture)

    const comments = Object.values(commentObj)

    const idObj = comments.filter(comment => comment?.id === id)
    // const idToEdit = idObj[0].id
    // console.log('id to edit', idToEdit)

    const [comment, setComment] = useState(idObj[0].comment)
    const [errors, setErrors] = useState([])


    const handleEdit = async (e) => {
        e.preventDefault();

        let updatedComment;

        // if this has a album_id. come back to this
        if (id) {
            updatedComment = {
                user_id: sessionUser?.id,
                album_id: idObj[0].album_id,
                comment,
                image: idObj[0].image
            }
        } else {
            updatedComment = {
                user_id: sessionUser?.id,
                album_id: null,
                comment,
                image: idObj[0].image
            }
        }

        if (comment) {
            setErrors([]);
            const data = await dispatch(editCommentThunk(id, updatedComment))

            if (data) {
                setErrors([data])
            }
        }
        return setErrors(['Title cannot be empty'])

    }

    return (
        <form onSubmit={handleEdit}>
             {/* <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> */}
            <ul className="errors">
                {comment.length < 1 && (
                    <li>Title has to be at least 1 character in length</li>
                )}
                {comment.length > 250 && (
                    <li>Title has to be less than 21 characters in length</li>
                )}
            </ul>
            <div> You <strong>could</strong> pick a name with punctuation!!</div>
            <label className="label-title"></label>
                <input
                className='title-input'
                type='text'
                value= {comment}
                onChange={(e) => setComment(e.target.value)}
                />
            <br></br>
            <button type="submit">Update Comment</button>
        </form>

    )
}

export default EditComment
