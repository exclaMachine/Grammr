import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPictureThunk } from '../../store/picture';
import CommentsPage from '../comments/Comments.js';
import './pictures.css'
import CreateComment from '../comments/PostComment';

const PicturePage = () => {
    const dispatch = useDispatch()
    const { id } = useParams();

    // console.log('param id', id)

    // const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    // let pictures = Object.values(pictureObj)
    // console.log("pic", pictures)
    // console.log('pic obj', pictureObj.picture)



    let wholeDate = pictureObj.picture?.created_at
    let newDate = new Date(wholeDate).toUTCString();
    let finalDate = newDate.split(' ').slice(0, 4).join(' ');
    //remember to add the plus
    // let userPic = pictures.filter(picture => picture?.id === +id)[0]

    // let userPicture = pictures[id-1]. This causes a problem when you delete pictures
    // console.log('userPic', userPic)
    // const [errors, setErrors] = useState([])

    useEffect(() => {

        dispatch(getPictureThunk(+id))

            // dispatch(getAllPicturesThunk())

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

    const picUser = users.find(user => user?.id === pictureObj.picture?.user_id )


    return (
        <>
        <div>
            {/* <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> */}

            <h1>{pictureObj.picture?.content}</h1>

            <div className='pictureContainer'>
                <div>
                    <div>Uploaded by {picUser?.username} on {finalDate}</div>

                    <br></br>

                    <img alt=''src={`${pictureObj.picture?.image}`}></img>

                    <CommentsPage/>
                    <CreateComment/>

                </div>

            </div>

        </div>
        </>
    )
}

export default PicturePage;
