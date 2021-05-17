import axios from 'axios'

export const addNotes = (data) => {
    return {
        type: 'ADD_NOTES',
        payload: data
    }
}

export const asyncAddNotes = (token, data) => {
    return (dispatch) => {
        const url = 'http://dct-user-auth.herokuapp.com/api/notes'
        axios.post(url, data, {
            headers: token
        })
            .then(response => {
                const addedNote = response.data
                dispatch(addNotes(addedNote))
            })
            .catch(err => alert(err.message))
    }
}

export const setNotes = (data) => {
    return {
        type: 'SET_NOTES',
        payload: data
    }
}

export const deleteNotes = (data) => {
    return {
        type: 'DELETE_NOTES',
        payload: data
    }
}

export const asyncDeleteNotes = (token, id) => {
    return (dispatch) => {
        const url = `http://dct-user-auth.herokuapp.com/api/notes/${id}`
        axios.delete(url, {
            headers: token
        })
            .then(response => {
                const deletedNote = response.data
                dispatch(deleteNotes(deletedNote))
            })
            .catch(err => alert(err.message))
    }
}

export const resetNotes = () => {
    return {
        type: 'RESET_NOTES'
    }
}

export const asyncGetNotes = (token) => {
    return (dispatch) => {
        const url = 'http://dct-user-auth.herokuapp.com/api/notes'
        axios.get(url, {
            headers: token
        })
            .then(response => {
                const notes = response.data
                dispatch(setNotes(notes))
            })
            .catch(err => alert(err.message))
    }
}