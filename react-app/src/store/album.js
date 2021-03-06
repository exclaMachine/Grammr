const GET_ALBUMS = 'album/GET_ALBUMS'
const SINGLE_ALBUM = 'album/SINGLE_ALBUM'
const POST_ALBUM = 'album/POST_ALBUM'
const DELETE_ALBUM = 'album/DELETE_ALBUM'
const EDIT_ALBUM = 'album/EDIT_ALBUM'

export const getAllAlbums = (albums) => {
    return {
        type: GET_ALBUMS,
        payload: albums
    }
}

export const getAlbum = (album) => {
    return {
        type: SINGLE_ALBUM,
        payload: album
    }
}

export const postAlbum = (album) => {
    return {
        type: POST_ALBUM,
        payload: album
    }
}

export const deleteAlbum = (id) => {
    return {
        type: DELETE_ALBUM,
        payload: id
    }
}

export const editPicture = (id, updatedAlbum) => {
    return {
        type: EDIT_ALBUM,
        id,
        updatedAlbum
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

export const getAlbumThunk = (id) => async dispatch => {
    const res = await fetch(`api/albums/${id}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getAlbum(data))
    }
}

export const postAlbumThunk = (data) => async dispatch => {
    const res = await fetch('/api/albums/new', {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const newAlbum = await res.json()
        dispatch(postAlbum(newAlbum))
        if (newAlbum.errors) {
            return newAlbum.errors
        }
        return newAlbum
    }
}

export const deleteAlbumThunk = (id) => async dispatch => {
    const res = await fetch(`/api/albums/${id}`,{
        method: 'DELETE'
    })
    if (res.ok) {
        const delObj = await res.json()
        // console.log('deletedpic', delObj.deleted_pic.id)
        dispatch(deleteAlbum(delObj.id.id))
    }
}

export const editAlbumThunk = (id, data) => async dispatch => {
    const res = await fetch(`/api/albums/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const updatedAlbum = await res.json()
        // console.log('updatedAlbum', updatedAlbum.updated_pic)
        dispatch(editPicture(id, updatedAlbum))
        if (updatedAlbum.errors) {
            return updatedAlbum.errors
        }
        return updatedAlbum
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

        case SINGLE_ALBUM:
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
            newState[action.updatedAlbum.id] = action.updatedAlbum
            return newState

        default:
            return state
    }
}

export default albumReducer
