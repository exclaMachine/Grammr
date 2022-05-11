import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPictureThunk } from "../../store/picture";

const EditPicture = ({id}) => {
    const dispatch = useDispatch()

    const [isInput, setInput] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    const pictures = Object.values(pictureObj)

    const idObj = pictures.filter(picture => picture?.id === id)
    // const idToEdit = idObj[0].id
    // console.log('id to edit', idToEdit)

    const [content, setContent] = useState(idObj[0].content)
    const [errors, setErrors] = useState([])

    const toggleClass = () => {
        setInput(!isInput);
    }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false)
        }

        document.addEventListener('focusout', closeMenu);

        return () => document.removeEventListener('focusout', closeMenu)
    }, [showMenu])


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

            if (data) {
                setErrors([data])
            }
        }
        return setErrors(['Title cannot be empty'])

    }
    let enterStrike = (e) => {
        document.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                return handleEdit(e)
            }
        })

    }

    return (
        <>
        {/* <h2 className={isInput ? "input": "not-input"} onClick={openMenu}>{content}</h2> */}
        {/* {showMenu && ( */}
        <form  onBlur={handleEdit} onKeyPress={enterStrike}>
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
            {/* <div> You <strong>could</strong> pick a name with punctuation!!</div> */}
            <label className="label-title"></label>
                <input
                className={isInput ? "not-input": "input"}
                type='text'
                value= {content}
                onChange={(e) => setContent(e.target.value)}
                />
            {/* <br></br>
            <button type="submit">Update Title</button> */}
        </form>
        {/* )} */}
        </>

    )
}

export default EditPicture
