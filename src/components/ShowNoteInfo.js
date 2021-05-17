import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowNoteInfo = (props) => {
    const { selectedId, selectNote } = props 
    const [ note, setNote ] = useState({})

    useEffect(() => {
        if(selectedId.length > 0) {
            axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${selectedId}`,{
            headers: {
                'x-auth':localStorage.getItem('token') 
            }
        })
            .then(response => {
                const result = response.data
                setNote(result)
            })
            .catch(err => alert(err.message))
        }
    }, [selectedId])
 
    return (
        <div id='modal'>
            {
                Object.keys(note).length === 0 ? (
                    <div className='modal-loader'></div>
                ) : (
                    <div id='modal-content'>
                        <div id='modal-header'>
                            { note.title && <h1> {note.title} </h1>} 
                            <p onClick={() => selectNote('')}> X </p>
                        </div>
                        <div id='modal-body'>
                        { note.body && <p> {note.body} </p>} 
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ShowNoteInfo