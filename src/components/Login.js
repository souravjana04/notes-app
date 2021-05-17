import React,{ useState } from 'react'
import axios from 'axios'
import validator from 'validator'

const Login = (props) => {
    const [ email, setEmail ] = useState('') 
    const [ password, setPassword ] = useState('') 
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const loginInServer = (data) => {
        axios.post('http://dct-user-auth.herokuapp.com/users/login',data)
            .then(response => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.errors)
                } else {
                    alert('successfully logged in')
                    localStorage.setItem('token',result.token)
                    props.handleAuth()
                    props.history.push('/')
                }
            })
            .catch(err => alert(err.message)) 
    }

    const validateForm = () => {
        if(!validator.isEmail(email)){
            errors.email = "Enter valid email"
        }

        if(password.length===0){
            errors.password = "Enter valid password"
        }
        setFormErrors(errors) 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validateForm()
        if(Object.keys(errors).length === 0){ 
            const formData = {
                email: email,
                password: password
            }
            loginInServer(formData)
        }
        // alert(`${formData.email} - ${formData.password}`)
    }

    return (
        <div id='login'>
            <h2 id='login-header'>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter email' value={email} onChange={handleChange} name='email' /><br/>
                { formErrors.email && <span>{formErrors.email} <br/> </span> }

                <input type='password' placeholder='Enter password' value={password} onChange={handleChange} name='password' /><br />
                { formErrors.password && <span>{formErrors.password} <br/> </span> }

                <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default Login