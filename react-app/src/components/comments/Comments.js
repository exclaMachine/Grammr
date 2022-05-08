import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCommentsThunk } from '../../store/comment'
import EditCommentModal from '../modals/EditCommentModal';
import { useParams } from 'react-router-dom';
import DeleteComment from './DeleteComment';
import SpecificUser from '../users/SpecificUser';

const CommentsPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.commentReducer)

    let comments = Object.values(commentObj)

    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //     const response = await fetch('/api/users/');
    //     const responseData = await response.json();
    //     setUsers(responseData.users);
    //     }
    //     fetchData();
    // }, []);

    // console.log('users', users)
    // console.log('comments1', comments)

    // const commentUser = users.find(user => user?.id === comments?.user_id)
    // console.log('commentUser', commentUser)

    let usersComments = comments.filter(comment => comment?.user_id === sessionUser?.id).reverse()
    // console.log('usecomments', usersComments)

    useEffect(() => {
        dispatch(getAllCommentsThunk(+id))
    }, [dispatch])

    return (
        <>
        <h1>Comments</h1>


        {comments.map((comment, id) => (
        <>

            <h4 className='comment' key={id}>{comment?.comment}</h4>
            {sessionUser?.id === comment?.user_id && (
                <>
                <SpecificUser id={comment.user_id}/>
                <EditCommentModal id={id}/>
                <DeleteComment id={id}/>
                </>
            )}
        </>
        ))}

        </>
    )
}

export default CommentsPage;
