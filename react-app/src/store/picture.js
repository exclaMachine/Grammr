const GET_PICTURES = 'picture/GET_PICTURES'
const POST_PICTURE = 'picture/POST_PICTURES'

export const getAllPictures = (pictures) => {
    return {
        type: GET_PICTURES,
        payload: pictures
    }
}

export const postPicture = (picture) => {
    return {
        type: POST_PICTURE,
        payload: picture
    }
}

export const getAllPicturesThunk = () => async dispatch => {
    const res = await fetch('/api/pictures')

    if (res.ok) {
        const pictures_obj = await res.json()
        dispatch(getAllPictures(pictures_obj))
    }
}

export const postPictureThunk = (data) => async dispatch => {
    const res = await fetch('/api/pictures/new', {
        method: "POST",
        body: data
    })
    if (res.ok) {
        const newPic = await res.json()
        dispatch(postPicture(newPic))
        return newPic
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
        case POST_PICTURE:
            newState = {...state}
            newState[action.payload.id] = action.payload
            // console.log('here', action.payload.picture)
            return newState;

        default:
            return state
    }
}

export default pictureReducer
