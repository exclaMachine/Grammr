import { postAlbumThunk } from "../../store/album";
import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateAlbum = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([]);

    const reset = () => {
        setTitle('')
    }

    const sessionUser = useSelector(state => state.session.user)
    // const pictureObj = useSelector(state => state.pictureReducer)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAlbum = {
            userId: sessionUser?.id,
            title
        }

        //error handling if blank
        if (title) {
            setErrors([]);
            reset();
            const data = await dispatch(postAlbumThunk(newAlbum))
            if (typeof data === 'string') {
                // console.log('inside data if', typeof data === 'string')
                return setErrors([data])
            }
            return dispatch(postAlbumThunk(newAlbum))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) {
            //         console.log('inside catch', data.errors)
            //         setErrors(data.errors);
            //     }
            // })
        }
        return setErrors(['Album title cannot be empty']);


    }
    // console.log('err', errors)
        return (
            <form onSubmit={handleSubmit}>
                 <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                {/* {errors[0]} */}
                <input
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                >

                </input>

                <button type="submit">Create Album</button>
            </form>
        )
}

export default CreateAlbum;
