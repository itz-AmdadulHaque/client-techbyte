"use client"

import AddToCart from '@/components/custom/AddToCart/AddToCart'
import ItemCounter from '@/components/custom/ItemCounter/ItemCounter'
import React, { useState } from 'react'

const HandleAddToCart = ({ id }: { id: string }) => {

    const [count, setCount] = useState(1);



    return (
        <div className='space-y-4 '>
            <ItemCounter initialValue={count} onChange={setCount} />

            <AddToCart id={id} type="product" count={count} successResponse={() => {
                console.log("adding");
                setCount(1)}} />
        </div>
    )
}

export default HandleAddToCart