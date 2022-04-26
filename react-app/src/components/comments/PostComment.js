import { postCommentThunk } from "../../store/album";
import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateComment = () => {
    const dispatch = useDispatch();

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([]);

    const reset = () => {
        setContent('')
    }

    const sessionUser = useSelector(state => state.session.user)
    // const pictureObj = useSelector(state => state.pictureReducer)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            userId: sessionUser?.id,
            content
        }

        //error handling if blank
        if (content) {
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
        return setErrors(['Comment content cannot be empty']);


    }
    // console.log('err', errors)
        return (
            <form onSubmit={handleSubmit}>
                 <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                {/* {errors[0]} */}
                <input
                className='content-input'
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                >

                </input>

                <button type="submit">Create Comment</button>
            </form>
        )
}

export default CreateComment;
