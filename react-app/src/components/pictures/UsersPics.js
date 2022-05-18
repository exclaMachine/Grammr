import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserPicturesThunk } from '../../store/picture';
import './pictures.css'
// import EditPicModal from '../modals/EditPicModal'

const UsersPicturesPage = () => {
    const dispatch = useDispatch()

    const { id } = useParams();
    const [isHidden, setHidden] = useState(false)


    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state => state.pictureReducer)
    let pictures = Object.values(pictureObj)
    console.log('usePics', pictures)

    const [users, setUsers] = useState([]);


    useEffect(() => {
        async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
        }
        fetchData();
    }, []);


    // let userArr = Object.values(users)
    let currentUserArr = users.filter(user => user?.id === +id)
    // console.log('curruser', currentUser)

    let currUser = currentUserArr[0]
    // let usersPictures = pictures.filter(picture => picture?.user_id === sessionUser?.id).reverse()

    // const Hide = () => {
    //     setHidden(true);
    // }

    // const Show = () => {
    //     setHidden(false);
    // }

    useEffect(() => {
        dispatch(getUserPicturesThunk(+id))
    }, [dispatch])

    return (
        <>
        <div className='pic-grid'>
            <h1>{currUser?.username}'s Pictures</h1>
            {pictures.length < 1 && (
            <h2>This user doesn't have any pictures!</h2>
            )}
            <div className='picturesContainer'>
                 <div>
                     <div className='pic-list'>
                         {pictures.map(({ id, content, image}) => (
                             <div className="individual-pic" key={id}>
                                 {/* <h1>{content}</h1> */}
                                     <NavLink className="navBar" to={`/pictures/${id}`} exact={true} activeClassName='active'>
                                         <img alt='' src={image}></img>
                                     </NavLink>
                             </div>
                         ))}
                     </div>

                 </div>

            </div>


        </div>
        </>
    )
}

export default UsersPicturesPage;
