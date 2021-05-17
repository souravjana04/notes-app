import React from 'react'
import DisplayNote from './DisplayNote'

const ShowNotesList = (props) => {
    const { notes, selectNote } = props

    return (
        <div id='notes-list'> 
            <h2>My Notes</h2>
            {
                notes.length === 0 ? (
                    <p>Add your note to display here</p>
                ) : (
                    notes.map(ele => <DisplayNote key={ele._id} {...ele} selectNote={selectNote} />)
                )
            }
        </div> 
    )
}

export default ShowNotesList