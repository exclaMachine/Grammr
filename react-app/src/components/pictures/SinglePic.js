import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPicturesThunk } from '../../store/picture'
import { getPictureThunk } from '../../store/picture';
import DeletePicture from './DeletePic';
// import EditPicture from './EditPic';
import './pictures.css'

const PicturePage = () => {
    const dispatch = useDispatch()
    const { id } = useParams();

    console.log('param id', id)

    // const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    let userPic = pictureObj[+id]
    // let pictures = Object.values(pictureObj)
    // console.log("pic", pictures)

    //remember to add the plus
    // let userPic = pictures.filter(picture => picture?.id === +id)[0]

    // let userPicture = pictures[id-1]. This causes a problem when you delete pictures
    console.log('userPic', userPic)
    const [errors, setErrors] = useState([])

    useEffect(() => {

        // dispatch(getPictureThunk(id))
        if (userPic){
            dispatch(getAllPicturesThunk())
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.error) setErrors(data.errors)
        } else {
            setErrors(['This picture does not exist'])
        }
            // } else {
        //     console.log('in the else')
        //     errors.push('Wrong page')

        // }
    }, [dispatch])

    return (
        <>
        <div>
            <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <h1>{userPic?.content}</h1>

            <div className='picturesContainer'>
                <div>
                    <img alt=''src={`${userPic?.image}`}></img>
                    {/* <DeletePicture/> */}

                </div>

            </div>

        </div>
        </>
    )
}

export default PicturePage;
