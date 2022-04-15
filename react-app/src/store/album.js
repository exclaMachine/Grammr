const GET_ALBUMS = 'album/GET_ALBUMS'
const SINGLE_PICTURE = 'album/SINGLE_PICTURE'
const POST_ALBUM = 'album/POST_ALBUM'
const DELETE_ALBUM = 'album/DELETE_ALBUM'
const EDIT_ALBUM = 'album/EDIT_ALBUM'

export const getAllAlbums = (albums) => {
    return {
        type: GET_ALBUMS,
        payload: albums
    }
}

export const getPicture = (album) => {
    return {
        type: SINGLE_PICTURE,
        payload: album
    }
}

export const postPicture = (album) => {
    return {
        type: POST_ALBUM,
        payload: album
    }
}

export const deletePicture = (id) => {
    return {
        type: DELETE_ALBUM,
        payload: id
    }
}

export const editPicture = (id, updatedPic) => {
    return {
        type: EDIT_ALBUM,
        id,
        updatedPic
    }
}

//Thunks
export const getAllAlbumsThunk = () => async dispatch => {
    const res = await fetch('/api/albums')

    if (res.ok) {
        const albums_obj = await res.json()
        dispatch(getAllAlbums(albums_obj))
    }
}

export const getPictureThunk = (id) => async dispatch => {
    const res = await fetch(`api/albums/${id}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getPicture(data))
    }
}

export const postAlbumThunk = (data) => async dispatch => {
    const res = await fetch('/api/albums/new', {
        method: "POST",
        body: data
    })
    if (res.ok) {
        const newAlbum = await res.json()
        dispatch(postPicture(newAlbum))
        return newAlbum
    }
}

export const deletePictureThunk = (id) => async dispatch => {
    const res = await fetch(`/api/albums/${id}`,{
        method: 'DELETE'
    })
    if (res.ok) {
        const delObj = await res.json()
        // console.log('deletedpic', delObj.deleted_pic.id)
        dispatch(deletePicture(delObj.deleted_pic.id))
    }
}

export const editPictureThunk = (id, data) => async dispatch => {
    const res = await fetch(`/api/albums/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const updatedPic = await res.json()
        // console.log('updatedPic', updatedPic.updated_pic)
        dispatch(editPicture(id, updatedPic.updated_pic))
        return updatedPic.updated_pic
    }
}

const initialState = {};

const albumReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case GET_ALBUMS:
            newState = { ...state };
            // action.payload.albums?.forEach((album) => newState[album.id] = album)
            // return newState;
            return action.payload

        case SINGLE_PICTURE:
            newState = {...state}
            return action.payload

        case POST_ALBUM:
            newState = {...state}
            newState[action.payload.id] = action.payload
            // console.log('here', action.payload.album)
            return newState;

        case DELETE_ALBUM:
            newState = {...state}
            delete newState[action.payload]
            return newState

        case EDIT_ALBUM:
            newState = {...state}
            newState[action.updatedPic.id] = action.updatedPic
            return newState

        default:
            return state
    }
}

export default albumReducer
