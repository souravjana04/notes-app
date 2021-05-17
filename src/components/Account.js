import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetAccountInfo } from '../action/accountAction'
import moment from 'moment'

const Account = (props) => {
    const userInfo = useSelector(state => state.accountInfo)
    const dispatch = useDispatch()

    const getUserInfo = useCallback((token) => {
        const jwtToken = { 
            'x-auth': token
        }
        dispatch(asyncGetAccountInfo(jwtToken))
    }, [dispatch])

    // fetch account information in initial rendering
    useEffect(() => {
        if(localStorage.getItem('token')){
            getUserInfo(localStorage.getItem('token'))
        } else {
            props.history.push('/login')
        }
    }, [getUserInfo, props.history])


    return(
        <div id='account'>
            <h1>User Account</h1>
            <p>Username : <span>{userInfo.username}</span></p>
            <p>Email : <span>{userInfo.email}</span></p>
            <p>Join Date : {userInfo.createdAt && <span>{moment(userInfo.createdAt).format('DD/MM/YYYY')}</span>}</p>
        </div>
    )
}

export default Account