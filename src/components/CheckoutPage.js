import React from 'react'
import CheckoutForm from './CheckoutForm'
import PaymentForm from './PaymentForm'
import ProductInfo from './ProductInfo'

export default function CheckoutPage() {
    return (
        <div className="Checkout">
            <h2>Checkout</h2>
            <ProductInfo />
            <CheckoutForm />
            <PaymentForm />
            <div>
                <button>Proceed</button>
            </div>
        </div>
    )
}
