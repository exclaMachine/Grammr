import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCommentsThunk } from '../../store/comment'
import EditCommentModal from '../modals/EditCommentModal';
import { useParams } from 'react-router-dom';
import DeleteComment from './DeleteComment';


const CommentsPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    // console.log('id from comms', id)
    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.commentReducer)
    console.log('sess', sessionUser?.id)
    // console.log('obj', commentObj)
    let entries = Object.entries(commentObj)
    // console.log('entries', entries)
    let comments = Object.values(commentObj)
    // console.log('comms from all', comments)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
        }
        fetchData();
    }, []);

    // console.log('users', users)
    // console.log('comments1', comments)

    const commentUser = users.find(user => user?.id === comments?.user_id)
    console.log('commentUser', commentUser)

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
