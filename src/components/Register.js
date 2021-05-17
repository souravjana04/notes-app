import React, { useState } from 'react'
import axios from 'axios'
import validator from 'validator'

const Register = (props) => {
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}

    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value)
        }else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    } 

    const registerInServer = (data) => {
        axios.post('http://dct-user-auth.herokuapp.com/users/register', data)
            .then(response => { 
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(JSON.stringify(result))
                } else {
                    alert('Successfully created an account')
                    props.history.push('/login')
                }
            })
            .catch(err => alert(err.message))
    }

    const validateForm = () => {
        if(username.length === 0 ){
            errors.username = "name can't be blank"
        }

        if(!validator.isEmail(email)){
            errors.email = "enter valid email"
        }

        if(password.length < 8 || password.length > 120){
            errors.password = "password length must be between 8 to 120 characters"
        }
        console.log(errors)
        setFormErrors(errors)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validateForm()
        if(Object.keys(errors).length === 0){
            const formData = {
                username: username,
                email: email,
                password: password
            }
            registerInServer(formData)
        }
    }

    return(
        <div id='register'>
            <h2 id='register-header'>Register with us</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter name' value={username} onChange={handleChange} name='username'/><br />
                { formErrors.username && <span>{formErrors.username} <br/> </span> }

                <input type='text' placeholder='Enter email' value={email} onChange={handleChange} name='email'/><br />
                { formErrors.email && <span>{formErrors.email} <br/> </span> }

                <input type='password' placeholder='Enter password' value={password} onChange={handleChange} name='password'/><br />
                { formErrors.password && <span>{formErrors.password} <br/> </span> }
                <input type='submit' value='Register' />
            </form>
        </div>
    )
}

export default Register