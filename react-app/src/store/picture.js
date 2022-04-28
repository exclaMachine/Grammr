const GET_PICTURES = 'picture/GET_PICTURES'
const SINGLE_PICTURE = 'picture/SINGLE_PICTURE'
const POST_PICTURE = 'picture/POST_PICTURES'
const DELETE_PICTURE = 'picture/DELETE_PICTURE'
const EDIT_PICTURE = 'picture/EDIT_PICTURE'

export const getAllPictures = (pictures) => {
    return {
        type: GET_PICTURES,
        payload: pictures
    }
}

export const getPicture = (picture) => {
    return {
        type: SINGLE_PICTURE,
        payload: picture
    }
}

export const postPicture = (picture) => {
    return {
        type: POST_PICTURE,
        payload: picture
    }
}

export const deletePicture = (id) => {
    return {
        type: DELETE_PICTURE,
        payload: id
    }
}

export const editPicture = (id, updatedPic) => {
    return {
        type: EDIT_PICTURE,
        id,
        updatedPic
    }
}

//Thunks
export const getAllPicturesThunk = () => async dispatch => {
    const res = await fetch('/api/pictures')

    if (res.ok) {
        const pictures_obj = await res.json()
        dispatch(getAllPictures(pictures_obj))
    }
}

export const getPictureThunk = (id) => async dispatch => {
    const res = await fetch(`/api/pictures/${id}`)

    if (res.ok) {
        const data = await res.json()
        // console.log('inside pic thunk', data)
        dispatch(getPicture(data))
    }
}

export const postPictureThunk = (data) => async dispatch => {
    const res = await fetch('/api/pictures/new', {
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
        dispatch(postPicture(newPic))
        // return newPic
    }
    // else {
    //     const error = await res.json()
    //     console.log('errors', error)
    //     return error
    // }
}

export const deletePictureThunk = (id) => async dispatch => {
    const res = await fetch(`/api/pictures/${id}`,{
        method: 'DELETE'
    })
    if (res.ok) {
        const delObj = await res.json()
        console.log('deletedpic', delObj.id)
        dispatch(deletePicture(delObj.id))
    }
}

export const editPictureThunk = (id, data) => async dispatch => {
    const res = await fetch(`/api/pictures/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const updatedPic = await res.json()
        // console.log('updatedPic', updatedPic.updated_pic)
        if (updatedPic.errors) {
            return updatedPic.errors
        }
        dispatch(editPicture(id, updatedPic.updated_pic))
        return updatedPic.updated_pic
    }
}

const initialState = {};

const pictureReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case GET_PICTURES:
            newState = { ...state };
            // action.payload.pictures?.forEach((picture) => newState[picture.id] = picture)
            // return newState;
            return action.payload

        case SINGLE_PICTURE:
            newState = {...state}
            return action.payload

        case POST_PICTURE:
            newState = {...state}
            newState[action.payload.id] = action.payload
            // console.log('here', action.payload.picture)
            return newState;

        case DELETE_PICTURE:
            newState = {...state}
            delete newState[action.payload]
            return newState

        case EDIT_PICTURE:
            newState = {...state}
            newState[action.updatedPic.id] = action.updatedPic
            return newState

        default:
            return state
    }
}

export default pictureReducer
