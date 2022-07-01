import React, { useContext } from 'react'
import { AuthContext } from '../context'
import MyButton from '../UI/button/MyButton'
import MyInput from '../UI/input/MyInput'

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = e => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
  }
  return (
    <div>
        <h1>Log in</h1>
        <form onSubmit={login}>
            <MyInput type="text" placeholder='Enter login'/>
            <MyInput type="password" placeholder='Enter password'/>
            <MyButton>Enter</MyButton>
        </form>
    </div>
  )
}

export default Login