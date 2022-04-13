import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const UploadPicture = () => {
    const history = useHistory();
    const [picture, setPicture] = useState(null);
    const [picLoading, setPicLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("picture", picture);

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
        setPicture(file);
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
