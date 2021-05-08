import React, { useState } from 'react';

const handleUserLogin = ({ username, password }) => {
    if (username === 'admin' && password === 'admin') {
        return { success: 1, message: 'logged in!' };
    } else {
        return { success: 0, message: 'Credentials are invalid!' };
    }
};

const DEFAULT_VALUES = {
    username: '',
    password: '',
    errorMessage: '',
    isLoggedin: false
};

export default function LoginForm() {
    const [values, setValues] = useState(DEFAULT_VALUES);

    const onClick = (e) => {
        e.preventDefault();

        console.log(values);
        if (values.username === '' || values.password === '') {
            setValues({
                ...values,
                errorMessage: 'Invalid credentials'
            });
            return;
        }

        const result = handleUserLogin(values);
        if (result.success) {
            setValues({ ...values, isLoggedin: true })
        } else {
            setValues({
                ...values,
                errorMessage: result.message || 'Something went wrong'
            })
        }
    };

    const handleChange = (field) => {
        return (e) => {
            console.log(e);
            const value = e.target.value;
            setValues({ ...values, [field]: value })
        }
    };

    const handleLogout = () => {
        setValues(DEFAULT_VALUES);
    }

    if (values.isLoggedin) {
        return (
            <>
                <div>Logged in!</div>
                <button onClick={handleLogout}>Logout</button>
            </>
        )
    }

    return (
        <>
            <h3>Login into Awesome app</h3>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={values.username} onChange={handleChange('username')} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" value={values.password} onChange={handleChange('password')} />
                </div>
                <div>
                    <button type="submit" onClick={onClick}>Login</button>
                </div>
            </form>
            {values.errorMessage && <p>{values.errorMessage}</p>}
        </>
    );
}
