import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCommentsThunk } from '../../store/comment'

const CommentsPage = ({id}) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const commentObj = useSelector(state => state.commentReducer)
    console.log('sess', sessionUser)
    // console.log('obj', commentObj)
    let comments = Object.values(commentObj)

    let usersComments = comments.filter(comment => comment?.user_id === sessionUser?.id).reverse()


    useEffect(() => {
        dispatch(getAllCommentsThunk())
    }, [dispatch])

    return (
        <>

        </>
    )
}

export default CommentsPage;
