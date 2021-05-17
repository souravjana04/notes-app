import React, { useEffect } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetNotes } from '../action/notesAction'
import { resetAccount } from '../action/accountAction'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'
import MyNotes from './MyNotes'
 
const NavBar = (props) => {
    const { userLoggedIn, handleAuth } = props
    const dispatch = useDispatch()
 
    useEffect(() => {
        if(userLoggedIn){
            props.history.push('/')
        }
    }, [props.history, userLoggedIn])

    return (
        <div>
            <div className='header'>
                <h1>Notes App</h1>
                <ul>
                    {
                        userLoggedIn ? (
                            <>
                                <li onClick={() => {
                                    localStorage.removeItem('token')
                                    alert('Successfully logged out')
                                    handleAuth()
                                    dispatch(resetNotes())
                                    dispatch(resetAccount())
                                    props.history.push('/')
                                }}><Link to='/'>Logout </Link></li>
                                <li><Link to='/notes'>My Notes</Link></li>
                                <li><Link to='/account'>Account </Link></li>                               
                            </>
                        ) : (
                            <>
                                <li><Link to='/login'>Login </Link></li>
                                <li><Link to='/register'>Register </Link></li>
                            </>
                        )
                    }
                    <li><Link to='/'>Home </Link></li>
                </ul>
            </div>   

            <Route path='/' component={Home} exact={true}/>
            <Route path='/register' component={Register} />
            <Route path='/login' render={(props) => {
                return <Login 
                            {...props}
                            handleAuth={handleAuth}
                    />
            }} />
            <Route path='/notes' component={MyNotes} />
            <Route path='/account' component={Account} />
        </div>
    )
}

export default withRouter(NavBar)