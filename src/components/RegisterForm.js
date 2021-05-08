import React, { useState, useEffect } from 'react'

function useDebounced(value) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        if (value === '') {
            setDebounced(value);
            return;
        }
        const timerId = setTimeout(() => {
            setDebounced(value);
        }, 500);
        return () => { clearTimeout(timerId) };
    }, [value]);

    return debounced;
};

export default function RegisterForm() {
    const [values, setValues] = useState({
        username: '',
        usernameError: '',
        password: '',
        confirmPassword: '',
        passwordError: '',
    });

    const debouncedUsername = useDebounced(values.username);
    const debouncedPassword = useDebounced(values.password);
    const debouncedConfirmPassword = useDebounced(values.confirmPassword);

    const setValuesWrap = (changes) => {
        setValues({ ...values, ...changes });
    };

    useEffect(() => {
        const validUsername = debouncedUsername.length >= 5;
        setValuesWrap({
            usernameError: validUsername ? '' : 'Username should be atleast 5 chars'
        });
    }, [debouncedUsername]);

    useEffect(() => {
        const passwordValidation = debouncedPassword === '' ||
            debouncedConfirmPassword === '' ||
            debouncedPassword === debouncedConfirmPassword;
        setValuesWrap({
            passwordError: passwordValidation ? '' : 'Passwords dont match'
        });
    }, [debouncedPassword, debouncedConfirmPassword]);

    const handleChange = (field) => {
        return (e) => {
            const value = e.target.value;
            if (field === 'username') {
                setValuesWrap({ [field]: value, usernameError: '' });
            }
            else if (field === 'password' || field === 'confirmPassword') {
                setValuesWrap({ [field]: value, passwordError: '' });
            }
        }
    };

    return (
        <>
            <h3>Register</h3>
            <form>
                <div>
                    <label htmlFor="username" >Username</label>
                    <input id="username" value={values.username} onChange={handleChange('username')} />
                    {values.usernameError && <p className="error">{values.usernameError}</p>}
                </div>
                <div>
                    <label htmlFor="password" >Password</label>
                    <input id="password" value={values.password} onChange={handleChange('password')} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input id="confirmPassword" value={values.confirmPassword} onChange={handleChange('confirmPassword')} />
                    {values.passwordError && <p className="error">{values.passwordError}</p>}
                </div>
                <button type="submit">Register!</button>
            </form>
        </>
    )
}
