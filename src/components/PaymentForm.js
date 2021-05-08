import React from 'react'

export default function PaymentForm() {
    return (
        <div>
            <h3>Payment details</h3>
            <form>
                <div>
                    <label>Card number</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Expiry date</label>
                    <input type="text"></input>
                </div>
            </form>
        </div>
    )
}
