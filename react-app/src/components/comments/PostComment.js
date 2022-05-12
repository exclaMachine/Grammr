import { postCommentThunk } from "../../store/comment";
import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const CreateComment = () => {
    const dispatch = useDispatch();

    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([]);
    const [showButton, setShowButton] = useState(false)
    const [count, setCount] = useState(0);


    const reset = () => {
        setComment('')
    }

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer.picture)

    let pictureID = pictureObj?.id
    // console.log('picID', pictureID)



    const addButton = () => {
        if (showButton) return;
        setShowButton(true);
    }

    const countCharacters = (e) => {
        document.addEventListener('')
    }

    useEffect(() => {
        if (!showButton) return;

        const removeButton = () => {
          setShowButton(false);
        };

        document.addEventListener('submit', removeButton);


        return () => document.removeEventListener("submit", removeButton);
      }, [showButton]);

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
            setCount(0);
            const data = await dispatch(postCommentThunk(newComment))
            console.log('data', data)
            if (typeof data === 'string') {
                console.log('inside data if', typeof data === 'string')


                setComment(comment)

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
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <div className="comment-container">
                    <textarea
                        onFocus={addButton}
                        className='comment-input'
                        // placeholder="Comment has to be at least 1 character in length"
                        value={comment}
                        onChange={(e)=> {setComment(e.target.value); setCount(e.target.value.length)}}
                        >
                    </textarea>

                    <span>
                        {showButton && (
                            <>
                            <span className='character-count'>{count}/255</span>
                            <button type="submit" >Post Comment</button>
                            </>
                        )}
                    </span>
                </div>

            </form>
        )
}

export default CreateComment;
