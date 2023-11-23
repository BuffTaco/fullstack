import {useState} from 'react'

const LoginForm = ( {login} ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleUserChange = (event) => {
        setUsername(event.target.value)
      }
      const handlePasswordChange = (event) => {
        setPassword(event.target.value)
      }
      const handleLogin = (event) => {
        event.preventDefault()
        login(username, password)
        setUsername('')
        setPassword('')
      }
      
    return (
        <>
        <form onSubmit={handleLogin}>
        <div>
            Username: <input value={username} onChange={handleUserChange}/>
          </div>
          <div>
            Password <input value={password} onChange={handlePasswordChange}/>
          </div>
          <div>
            <button type="submit">Enter</button>
          </div>
        </form>
        
        </>
    )
}

export default LoginForm