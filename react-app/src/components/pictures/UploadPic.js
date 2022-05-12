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
    const [title, setTitle] = useState(pic?.name);
    const [errors, setErrors] = useState([]);
    const [picLoading, setPicLoading] = useState(false);




    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("image", pic);
        formData.append("user_id", sessionUser?.id)
        formData.append("content", title)

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

        setPicLoading(true);
        setErrors([])
        // setPic('')
        const data = await dispatch(postPictureThunk(formData))
        //
            if (data) {
                // console.log('inside data', data)
                setErrors([data]);
            }


        //This has to be her otherwise the uploaded pic section will not go away
        setPic(null);
        setPicLoading(false)
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
        // console.log('target!!!', e.target.files[0])

        setPic(file);
        setTitle(file?.name)
    }

        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="fileupload" className="new-file-upload">
                    <i className="fa-solid fa-cloud-arrow-up">  Upload Pic </i>
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
                {pic && (
                <>
                    {/* <div
                    id="fileselected">
                        {pic.name}
                    </div> */}

                    <div>
                        <input
                        type="text"
                        name="content"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        >
                        </input>
                    </div>


                    <img
                    className='uploadedPic'
                    alt='your pic'
                    src={URL.createObjectURL(pic)}
                    >

                    </img>

                    <div>
                        <button className='upload-button' type="submit">Upload Pic</button>
                    </div>
                </>
                )}

                {(picLoading)&& <p>Loading...</p>}
            </form>
        )

}


export default UploadPicture;
