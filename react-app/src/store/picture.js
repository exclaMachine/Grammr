const GET_PICTURES = 'picture/GET_PICTURES'

export const getAllPictures = (pictures) => {
    return {
        type: GET_PICTURES,
        pictures
    }
}

export const getAllPicturesThunk = () => async dispatch => {
    const res = await fetch('/api/pictures')

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllPictures(data))
    }
}

const initialState = {};

const pictureReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case GET_PICTURES:
            newState = { ...state };
            action.payload.pictures?.forEach((picture) => newState[picture.id] = picture)
            return newState;

        default:
            return state
    }
}

export default pictureReducer
