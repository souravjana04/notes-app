import React from 'react'
import { useDispatch } from 'react-redux'
import { asyncDeleteNotes } from '../action/notesAction'

const DisplayNote = (props) => {
    const { _id, title, selectNote } = props
    const dispatch = useDispatch()

    const removeNote = () => { 
        const permission = window.confirm('Are you sure?')
        if(permission){
            const jwtToken = {
                'x-auth': localStorage.getItem('token')
            }
            dispatch(asyncDeleteNotes(jwtToken, _id))
        }
    }

    return (
        <div className='notes' >
            <h3 onClick={() => selectNote(_id)}> {title} </h3>
            <button onClick={removeNote}>Remove</button>
        </div>
    )
}

export default DisplayNote