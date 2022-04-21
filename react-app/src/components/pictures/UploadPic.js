import React, {useState } from "react";
// import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { postPictureThunk } from '../../store/picture'
import './pictures.css'


const UploadPicture = ({id}) => {
    // const history = useHistory();
    const dispatch = useDispatch();


    const sessionUser = useSelector(state => state.session.user)
    // const pictureObj = useSelector(state => state.pictureReducer)

    const [pic, setPic] = useState(null);
    const [errors, setErrors] = useState([]);
    // const [picLoading, setPicLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("image", pic);
        formData.append("user_id", sessionUser?.id)

        //this id represents the album_id
        if (id) {
            // console.log('inside if', id)
            formData.append("album_id", id)
        }
        else {
            // console.log('inside else', id)
            formData.append('album_id', "noId")
        }
        // console.log('pic', pic.name)
        // formData.append("content", image.name)
        // formData.append("album_id", 1)
        // for (let pair of formData.entries()) {
        //        console.log(`${pair[0]}, ${pair[1]}`);

        //      }
        // console.log('formdata', formData)

        // setPicLoading(true);
        setErrors([])
        // setPic('')
        const data = await dispatch(postPictureThunk(formData))
        //
            if (data) {
                // console.log('inside data', data)
                setErrors([data]);
            }
        setPic('')
            // const res = await fetch('/api/pictures', {
        //     method: 'POST',
        //     body: formData
        // })
        // if (res.ok) {
        //     await res.json();
        //     setPicLoading(false);
            // history.push("/pictures");
        // }
        // else {
        //     setPicLoading(false);

        //     console.log("Pic failed to load")
        // }
    }



    const updatePic = (e) => {
        const file = e.target.files[0];
        console.log('target!!!', e.target.files[0])

        setPic(file);
    }

        return (
            <form onSubmit={handleSubmit}>
                <label for="fileupload" class="new-file-upload">
                    Choose File
                </label>
                <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <input
                    id="fileupload"
                    type="file"
                    accept="image/*"
                    onChange={updatePic}
                />
                {pic && (<span id="fileselected"

                >{pic.name}</span>)}
                <button className='upload-button' type="submit">Upload Pic</button>
                {/* {(picLoading)&& <p>Loading...</p>} */}
            </form>
        )

}


export default UploadPicture;
