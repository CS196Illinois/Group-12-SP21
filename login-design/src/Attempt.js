import React, { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {

    }

    return (
        <div className='Login'>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
            <button type="button" onClick={login}>Login</button>
        </div>
    )
}