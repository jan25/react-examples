import React, { useState, useEffect } from 'react';

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

const readLocalStorage = (key, initialValue) => {
    const value = JSON.parse(localStorage.getItem(key));
    console.log('read value', value);
    if (value !== null) return value;

    return initialValue;
};

const useStore = (key, initialValue) => {
    const [stored, setStored] = useState(readLocalStorage(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(stored));
    }, [key, stored]);

    return [stored, setStored];
};

export default function LoginForm() {
    const [values, setValues] = useState(DEFAULT_VALUES);
    const [isLoggedIn, setIsLoggedIn] = useStore('isLoggedIn', false);

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
            setIsLoggedIn(true);
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
        setIsLoggedIn(false);
        setValues(DEFAULT_VALUES);
    }

    return (
        <>
            { isLoggedIn &&
                <>
                    <div>Logged in!</div>
                    <button onClick={handleLogout}>Logout</button>
                </>
            }
            { isLoggedIn ||
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
            }
        </>
    );
}
