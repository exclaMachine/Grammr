import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAlbumThunk } from "../../store/album";

const EditAlbum = ({id}) => {
    const dispatch = useDispatch()


    const sessionUser = useSelector(state => state.session.user)
    const albumObj = useSelector(state => state.albumReducer)
    const albums = Object.values(albumObj)
    // console.log('albumObj', albumObj)

    const idObj = albums.filter(album => album?.id === id)

    const [title, setTitle] = useState(idObj[0].title)
    const [errors, setErrors] = useState([])


    const handleEdit = async (e) => {
        e.preventDefault();

        let updatedPicture;



            updatedPicture = {
                user_id: sessionUser?.id,
                title,
            }


        if (title) {
            setErrors([]);
            const data = await dispatch(editAlbumThunk(id, updatedPicture))
            if (data) {
                return setErrors([data])
                // console.log('inside data if', data)
            }
            dispatch(editAlbumThunk(id, updatedPicture))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.error) setErrors(data.errors)
            // })
        }
        return setErrors(['Title cannot be empty'])
    }

    return (
        <form onSubmit={handleEdit}>
            {errors && (
             <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            )}
            <label className="label title">Title</label>
                <input
                className='title-input'
                type='text'
                value= {title}
                onChange={(e) => setTitle(e.target.value)}
                />

            <button type="submit">Update Album Title</button>
        </form>

    )
}

export default EditAlbum
