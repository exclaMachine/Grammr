import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllPicturesThunk } from '../store/picture'


const PicturesPage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const pictureObj = useSelector(state = state.pictureReducer)

    console.log('obj', pictureObj)




    return (
        <>
        <div>
            <h1>Pictures</h1>
        </div>
        </>
    )
}
