import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCommentsThunk } from '../../store/comment'
import EditCommentModal from '../modals/EditCommentModal';
import { useParams } from 'react-router-dom';


const CommentsPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    console.log('id from comms', id)
    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.commentReducer)
    // console.log('sess', sessionUser)
    console.log('obj', commentObj)
    let entries = Object.entries(commentObj)
    console.log('entries', entries)
    let comments = Object.values(commentObj)
    console.log('comms from all', comments)


        let commentArr = []
        for (const comment in commentObj) {
            commentArr.push(comment)
            commentArr.push(commentObj[comment].comment)
        }
        console.log('commentArr', commentArr)


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
            <h2 key={id}>{comment.comment}</h2>
            <EditCommentModal id={id}/>
        </>
        ))}

        </>
    )
}

export default CommentsPage;
