import { postCommentThunk } from "../../store/comment";
import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const CreateComment = () => {
    const dispatch = useDispatch();

    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([]);

    const reset = () => {
        setComment('')
    }

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer.picture)

    let pictureID = pictureObj?.id
    // console.log('picID', pictureID)


    // let picture = Object.values(pictureObj.picture)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            userId: sessionUser?.id,
            comment,
            picture_id: pictureID
        }

        //error handling if blank
        if (comment) {
            setErrors([]);
            reset();
            const data = await dispatch(postCommentThunk(newComment))
            console.log('data', data)
            if (typeof data === 'string') {
                // console.log('inside data if', typeof data === 'string')
                return setErrors([data])
            }
            // return dispatch(postCommentThunk(newComment))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) {
            //         console.log('inside catch', data.errors)
            //         setErrors(data.errors);
            //     }
            // })
        }
        // return setErrors(['Comment cannot be empty']);


    }
    // console.log('err', errors)
        return (
            <form onSubmit={handleSubmit}>
                 <ul className="errors">
                {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
                {/* {comment.length < 1 && (
                    <li>Comment has to be at least 1 character in length</li>
                )} */}
                </ul>
                <textarea
                className='comment-input'
                placeholder="Comment has to be at least 1 character in length"
                value={comment}
                onChange={(e)=> setComment(e.target.value)}
                >

                </textarea>

                <button type="submit">Create Comment</button>
            </form>
        )
}

export default CreateComment;
