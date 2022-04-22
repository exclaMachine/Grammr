const GET_COMMENTS = 'comment/GET_COMMENTS'
const SINGLE_COMMENT = 'comment/SINGLE_COMMENT'
const POST_COMMENT = 'comment/POST_COMMENTS'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'
const EDIT_COMMENT = 'comment/EDIT_COMMENT'

export const getAllComments = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}

export const getComment = (comment) => {
    return {
        type: SINGLE_COMMENT,
        payload: comment
    }
}

export const postComment = (comment) => {
    return {
        type: POST_COMMENT,
        payload: comment
    }
}

export const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        payload: id
    }
}

export const editComment = (id, updatedComment) => {
    return {
        type: EDIT_COMMENT,
        id,
        updatedComment
    }
}

//Thunks
export const getAllCommentsThunk = () => async dispatch => {
    const res = await fetch('/api/comments')

    if (res.ok) {
        const comments_obj = await res.json()
        dispatch(getAllComments(comments_obj))
    }
}

export const getCommentThunk = (id) => async dispatch => {
    const res = await fetch(`api/comments/${id}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getComment(data))
    }
}

export const postCommentThunk = (data) => async dispatch => {
    const res = await fetch('/api/comments/new', {
        method: "POST",
        body: data
    })
    if (res.ok) {
        const newPic = await res.json()
        console.log('newPic', newPic.errors)
        if (newPic.errors) {
            // console.log('inside', newPic.errors)
            return newPic.errors
        }
        dispatch(postComment(newPic))
        // return newPic
    }
    // else {
    //     const error = await res.json()
    //     console.log('errors', error)
    //     return error
    // }
}

export const deleteCommentThunk = (id) => async dispatch => {
    const res = await fetch(`/api/comments/${id}`,{
        method: 'DELETE'
    })
    if (res.ok) {
        const delObj = await res.json()
        // console.log('deletedpic', delObj.deleted_comment.id)
        dispatch(deleteComment(delObj.deleted_comment.id))
    }
}

export const editCommentThunk = (id, data) => async dispatch => {
    const res = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const updatedComment = await res.json()
        // console.log('updatedComment', updatedComment.updated_pic)
        if (updatedComment.errors) {
            return updatedComment.errors
        }
        dispatch(editComment(id, updatedComment.updated_pic))
        return updatedComment.updated_pic
    }
}

const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case GET_COMMENTS:
            newState = { ...state };
            // action.payload.comments?.forEach((comment) => newState[comment.id] = comment)
            // return newState;
            return action.payload

        case SINGLE_COMMENT:
            newState = {...state}
            return action.payload

        case POST_COMMENT:
            newState = {...state}
            newState[action.payload.id] = action.payload
            // console.log('here', action.payload.comment)
            return newState;

        case DELETE_COMMENT:
            newState = {...state}
            delete newState[action.payload]
            return newState

        case EDIT_COMMENT:
            newState = {...state}
            newState[action.updatedComment.id] = action.updatedComment
            return newState

        default:
            return state
    }
}

export default commentReducer
