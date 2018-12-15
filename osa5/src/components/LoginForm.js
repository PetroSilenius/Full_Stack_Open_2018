import React from 'react'

const LoginForm = props => {
    return (
        <div className="loginForm">
            <h1>Kirjaudu sisään</h1>
            <form onSubmit={props.handleLogin}>
                <div>
                    Käyttäjänimi:
                    <input type="text" name="username" value={props.username} onChange={props.handleFieldChange} />
                </div>
                <div>
                    Salasana:
                    <input type="password" name="password" value={props.password} onChange={props.handleFieldChange} />
                </div>
                <button type="submit">Kirjaudu sisään</button>
            </form>
        </div>
    )
}

export default LoginForm