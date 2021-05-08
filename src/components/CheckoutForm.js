import React, { useState } from 'react'

export default function CheckoutForm() {
    const [values, setValues] = useState({
        name: '',
        address: '',
        email: '',
        nameValid: true,
        emailValid: true
    })

    const setName = (name) => {
        if (name === '') {
            setValues({
                ...values,
                name,
                nameValid: false
            })
            return
        }
        setValues({
            ...values,
            name,
            nameValid: true
        })
    }

    const setEmail = (email) => {
        if (email === '') {
            setValues({
                ...values,
                email,
                emailValid: false
            })
            return
        }
        setValues({
            ...values,
            email,
            emailValid: true
        })
    }

    const setAddress = (address) => {
        setValues({
            ...values,
            address
        })
    }

    return (
        <div>
            <h3>Customer details</h3>
            {!values.nameValid && <p>Name is invalid</p>}
            {!values.emailValid && <p>Email is invalid</p>}
            <form>
                <div>
                    <label>Name*</label>
                    <input type="text" value={values.name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email*</label>
                    <input type="text" value={values.email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" value={values.address} onChange={e => setAddress(e.target.value)} />
                </div>
            </form>
        </div>
    )
}
