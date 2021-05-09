import React, { useState, useEffect } from 'react';

const ProductCard = ({ name, image, features, idx }) => {
    const style = {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid black',
        padding: '12px',
        marginTop: '8px'
    };

    return (
        <div style={style}>
            <div>
                <h4>{name} {idx}</h4>
                {features && <ul>
                    {features.map((feature) => <li>{feature}</li>)}
                </ul>}
            </div>
            <div>
                <img src={image} />
            </div>
        </div>
    );
};

const getProducts = () => {
    const exampleProps = {
        name: 'Example product',
        image: "https://picsum.photos/200",
        features: [
            '20x30 dimension',
            'simple to use',
            'comes with charger'
        ]
    };

    return [
        exampleProps,
        exampleProps,
        exampleProps,
        exampleProps,
        exampleProps,
        exampleProps
    ]
}

export default function ProductList() {
    const [bottom, setBottom] = useState(false);
    const [products, setProducts] = useState(getProducts())

    // Throttled scrolled to bottom check
    const isBottom = () => (window.innerHeight + window.scrollY >= document.body.offsetHeight);
    useEffect(() => {
        let timerId = null;
        window.onscroll = () => {
            if (timerId !== null) return;
            timerId = setTimeout(() => {
                console.log('setting bottom')
                setBottom(isBottom());
                timerId = null;
            }, 500)
        }
    }, []);

    useEffect(() => {
        if (!bottom) return;
        console.log('getting products')
        setProducts([...products, ...(getProducts())]);
        setBottom(false);
    }, [bottom])

    return (
        <div style={{ width: '75%', margin: '0 auto' }}>
            <h3>Product List</h3>
            <p style={{ position: 'sticky', top: '0px', backgroundColor: 'yellow' }}>products: {products.length}</p>
            {products && products.map((product, i) => <ProductCard {...product} idx={i} />)}
        </div>
    )
}
