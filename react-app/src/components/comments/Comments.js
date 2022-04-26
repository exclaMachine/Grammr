import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCommentsThunk } from '../../store/comment'
import CreateComment from './PostComment';


const CommentsPage = ({id}) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.commentReducer)
    // console.log('sess', sessionUser)
    // console.log('obj', commentObj)
    let comments = Object.values(commentObj).reverse()
    // console.log('comms', comments)

    let usersComments = comments.filter(comment => comment?.user_id === sessionUser?.id).reverse()
    // console.log('usecomments', usersComments)

    useEffect(() => {
        dispatch(getAllCommentsThunk(+id))
    }, [dispatch])

    return (
        <>
        <h1>Comments</h1>

        {comments.map((comment) => (
            <h2>{comment.comment}</h2>
        ))}
        {/* <CreateComment/> */}

        </>
    )
}

export default CommentsPage;
