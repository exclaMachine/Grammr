import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCommentThunk } from "../../store/comment";

const EditComment = ({id}) => {
    const dispatch = useDispatch()

    // console.log('just id', id)

    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.commentReducer)
    const pictureObj = useSelector(state => state.pictureReducer.picture)
    // console.log('sessuse', sessionUser?.id)

    const comments = Object.values(commentObj)
    console.log('comms', comments)
    console.log('commObj', commentObj)
    // console.log('is this it', commentObj[+id])

    console.log('id', id)
    const commentArr = comments.map(comment => comment?.comment)
    console.log('commentArr', commentArr)

    // const idToEdit = commentArr[0]?.id
    // console.log('id to edit', idToEdit)

    //don't need to change it to an array first. Fix this comments[+id].comment
    const [comment, setComment] = useState(commentArr[+id])
    const [errors, setErrors] = useState([])
    console.log('comment', comment)


    console.log('is this the id', comments[+id].picture_id)
    console.log('comments in edit', comments)

    const handleEdit = async (e) => {
        e.preventDefault();

        let updatedComment;

        // if this has a album_id. come back to this
        if (id) {
            updatedComment = {
                user_id: comments[+id].user_id,
                album_id: comments[+id].album_id,
                comment,
                picture_id: comments[+id].picture_id
            }
        } else {
            updatedComment = {
                user_id: comments[+id].user_id,
                album_id: null,
                comment,
                picture_id: comments[+id].picture_id
            }
        }

        if (comment) {
            setErrors([]);
            const data = await dispatch(editCommentThunk(comments[+id]?.id, updatedComment))
            console.log('data in edit Comments', data)
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
