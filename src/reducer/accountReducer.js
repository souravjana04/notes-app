const initialAccountState = {}

const accountReducer = (state = initialAccountState, action) => {
    switch(action.type) {
        case 'SET_ACCOUNT':
            return {...action.payload}
        case 'RESET_ACCOUNT': 
            return {}
        default:
            return state
    }
}

export default accountReducer