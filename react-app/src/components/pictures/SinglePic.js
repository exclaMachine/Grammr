import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPicturesThunk } from '../../store/picture'
// import { getPictureThunk } from '../../store/picture';
// import DeletePicture from './DeletePic';
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

    let wholeDate = userPic?.created_at
    let newDate = new Date(wholeDate).toUTCString();
    let finalDate = newDate.split(' ').slice(0, 4).join(' ');
    //remember to add the plus
    // let userPic = pictures.filter(picture => picture?.id === +id)[0]

    // let userPicture = pictures[id-1]. This causes a problem when you delete pictures
    // console.log('userPic', userPic)
    // const [errors, setErrors] = useState([])

    useEffect(() => {

        // dispatch(getPictureThunk(id))

            dispatch(getAllPicturesThunk())

            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.error) setErrors(data.errors)
        // }
    }, [dispatch])

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
        }
        fetchData();
    }, []);

    const picUser = users.find(user => user?.id === userPic?.user_id )
    // console.log('users!!!', users)
    // console.log('picUser', picUser)

    return (
        <>
        <div>
            {/* <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> */}

            <h1>{userPic?.content}</h1>

            <div className='picturesContainer'>
                <div>
                    <div>Uploaded by {picUser?.username}</div>
                    <div>Uploaded on {finalDate}</div>
                    <img alt=''src={`${userPic?.image}`}></img>
                    {/* <DeletePicture/> */}

                </div>

            </div>

        </div>
        </>
    )
}

export default PicturePage;
