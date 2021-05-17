const initialNotesState = []

const notesReducer = (state = initialNotesState, action) => {
    switch(action.type) {
        case 'ADD_NOTES':
            return [action.payload, ...state]
        case 'SET_NOTES': 
            return [...action.payload].reverse()
        case 'RESET_NOTES':
            return []
        case 'DELETE_NOTES':
            return state.filter(ele => ele._id !== action.payload._id)
        default: 
            return state
    }
}

export default notesReducer