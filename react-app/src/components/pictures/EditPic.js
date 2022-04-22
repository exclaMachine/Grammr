import React, {useState } from "react";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPictureThunk } from "../../store/picture";

const EditPicture = ({id}) => {
    const dispatch = useDispatch()

    // console.log('just id', id)

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    const pictures = Object.values(pictureObj)

    const idObj = pictures.filter(picture => picture?.id === id)
    // const idToEdit = idObj[0].id
    // console.log('id to edit', idToEdit)

    const [content, setContent] = useState(idObj[0].content)
    const [errors, setErrors] = useState([])


    const handleEdit = async (e) => {
        e.preventDefault();

        let updatedPicture;

        // if this has a album_id. come back to this
        if (id) {
            updatedPicture = {
                user_id: sessionUser?.id,
                album_id: idObj[0].album_id,
                content,
                image: idObj[0].image
            }
        } else {
            updatedPicture = {
                user_id: sessionUser?.id,
                album_id: null,
                content,
                image: idObj[0].image
            }
        }

        if (content) {
            setErrors([]);
            const data = await dispatch(editPictureThunk(id, updatedPicture))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.error) setErrors(data.errors)
            // })
            if (data) {
                setErrors([data])
            }
        }
        return setErrors(['Title cannot be empty'])

        // dispatch(editPictureThunk(idToEdit))
    }

    return (
        <form onSubmit={handleEdit}>
             {/* <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> */}
            <ul className="errors">
                {content.length < 1 && (
                    <li>Title has to be at least 1 character in length</li>
                )}
                {content.length > 20 && (
                    <li>Title has to be less than 21 characters in length</li>
                )}
            </ul>
            <label className="label-title">Title</label>
                <input
                className='title-input'
                type='text'
                value= {content}
                onChange={(e) => setContent(e.target.value)}
                />
            <br></br>
            <button type="submit">Update Title</button>
        </form>

    )
}

export default EditPicture
