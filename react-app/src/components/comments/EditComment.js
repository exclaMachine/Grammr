import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCommentThunk } from "../../store/comment";

const EditComment = ({id}) => {
    const dispatch = useDispatch()


    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.commentReducer)
    const pictureObj = useSelector(state => state.pictureReducer.picture)

    const comments = Object.values(commentObj)


    const commentArr = comments.map(comment => comment?.comment)

    // const idToEdit = commentArr[0]?.id

    //don't need to change it to an array first. Fix this comments[+id].comment
    const [comment, setComment] = useState(commentArr[+id])
    const [errors, setErrors] = useState([])




    const handleEdit = async (e) => {
        e.preventDefault();

        let updatedComment;

            updatedComment = {
                user_id: comments[+id].user_id,
                comment,
                picture_id: comments[+id].picture_id

        }

        if (comment) {
            setErrors([]);
            const data = await dispatch(editCommentThunk(comments[+id]?.id, updatedComment))
            if (data) {
                setErrors([data])
            }
        }
        return setErrors(['Comment cannot be empty'])

    }



    return (
        <form onSubmit={handleEdit}>
             {/* <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> */}
            <ul className="errors">
                {comment?.length < 1 && (
                    <li>Comment has to be at least 1 character in length</li>
                )}
                {comment?.length > 250 && (
                    <li>Comment has to be less than 251 characters in length</li>
                )}
            </ul>
            <div> You <strong>should</strong> add punctuation!!</div>
            <br></br>
            <label className="label-title"></label>
                <textarea
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
