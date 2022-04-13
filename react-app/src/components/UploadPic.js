import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllPicturesThunk } from "../store/picture";

const UploadPicture = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [pic, setPic] = useState(null);
    const [picLoading, setPicLoading] = useState(false);




    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", pic);
        // console.log('pic', pic.name)
        // formData.append("content", image.name)
        // formData.append("album_id", 1)
        console.log('formdata', formData)

        setPicLoading(true);

        const res = await fetch('/api/pictures', {
            method: 'POST',
            body: formData
        })
        if (res.ok) {
            await res.json();
            setPicLoading(false);
            history.push("/pictures");
        }
        else {
            setPicLoading(false);

            console.log("Pic failed to load")
        }
    }

    const updatePic = (e) => {
        const file = e.target.files[0];
        setPic(file);
    }

        return (
            <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={updatePic}
                />
                <button type="submit">Submit</button>
                {(picLoading)&& <p>Loading...</p>}
            </form>
        )

}

export default UploadPicture;
