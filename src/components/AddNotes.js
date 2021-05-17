import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncAddNotes } from '../action/notesAction'

const AddNotes = (props) => {
    const dispatch = useDispatch()
    const [ title, setTitle ] = useState('')
    const [ body, setBody ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}

    const handleChange = (e) => {
        if(e.target.name === 'title') {
            setTitle(e.target.value)
        } else if(e.target.name === 'body') {
            setBody(e.target.value)
        }
    }

    const validateForm = () => {
        if(title.length === 0){
            errors.title = "Title can't be blank"
        }
        setFormErrors(errors)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validateForm()
        if(Object.keys(errors).length === 0){
            const formData = {
                title: title,
                body: body
            }
            const jwtToken = {
                'x-auth': localStorage.getItem('token')
            }
            dispatch(asyncAddNotes(jwtToken, formData))
            resetForm()
        }  
    }

    const resetForm = () => {
        setTitle('')
        setBody('')
    } 

    return (
        <div id='add-note'>
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title</label><br />
                <input type='text' name='title' value={title} onChange={handleChange}/><br />
                { formErrors.title && <span> {formErrors.title} <br/></span>}

                <label htmlFor='body'>Body</label><br />
                <textarea name='body' value={body} onChange={handleChange} /><br />

                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default AddNotes