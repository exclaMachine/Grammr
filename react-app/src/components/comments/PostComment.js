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
    // const pictureObj = useSelector(state => state.pictureReducer)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            userId: sessionUser?.id,
            comment
        }

        //error handling if blank
        if (comment) {
            setErrors([]);
            reset();
            const data = await dispatch(postCommentThunk(newComment))
            if (typeof data === 'string') {
                // console.log('inside data if', typeof data === 'string')
                return setErrors([data])
            }
            return dispatch(postCommentThunk(newComment))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) {
            //         console.log('inside catch', data.errors)
            //         setErrors(data.errors);
            //     }
            // })
        }
        return setErrors(['Comment cannot be empty']);


    }
    // console.log('err', errors)
        return (
            <form onSubmit={handleSubmit}>
                 <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                {/* {errors[0]} */}
                <input
                className='comment-input'
                value={comment}
                onChange={(e)=> setComment(e.target.value)}
                >

                </input>

                <button type="submit">Create Comment</button>
            </form>
        )
}

export default CreateComment;
