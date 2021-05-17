import axios from 'axios'

export const setAccount = (data) => {
    return {
        type: 'SET_ACCOUNT',
        payload: data
    }
}

export const resetAccount = () => {
    return {
        type: 'RESET_ACCOUNT',
    }
}

export const asyncGetAccountInfo = (token) => {
    return (dispatch) => {
        const url = 'http://dct-user-auth.herokuapp.com/users/account'

        axios.get(url, {
            headers: token
        })
            .then(response => {
                const accountInfo = response.data
                dispatch(setAccount(accountInfo))
            })
            .catch(err => alert(err.message))
    }
}