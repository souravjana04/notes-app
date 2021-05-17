import React,{ useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetNotes } from '../action/notesAction'
import AddNotes from './AddNotes'
import ShowNotesList from './ShowNotesList'
import ShowNoteInfo from './ShowNoteInfo'

const MyNotes = (props) => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes)
    const [ selectedId, setSelectedId ] = useState('')

    const getNotes = useCallback((token) => {
        const jwtToken = {
            'x-auth': token
            }
        dispatch(asyncGetNotes(jwtToken))
    }, [dispatch])

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes(localStorage.getItem('token'))
        } else {
            props.history.push('/login')
        }
    }, [getNotes, props.history, dispatch])

    const selectNote = (id) => {
        setSelectedId(id)
    }

    return (
        <div id='my-notes'>
            <ShowNotesList notes={notes} selectNote={selectNote} />
            <AddNotes />
            {selectedId.length>0 && <ShowNoteInfo selectedId={selectedId} selectNote={selectNote} />}
        </div>
    )
}

export default MyNotes