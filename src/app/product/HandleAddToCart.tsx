"use client"

import AddToCart from '@/components/custom/AddToCart/AddToCart'
import ItemCounter from '@/components/custom/ItemCounter/ItemCounter'
import React, { useState } from 'react'

const HandleAddToCart = ({ id, slug }: { id: string, slug: string }) => {

    const [count, setCount] = useState(1);

    return (
        <div className='space-y-4 '>
            <ItemCounter value={count} onChange={setCount} />

            <AddToCart id={id} type="product" count={count} successResponse={() => {
                setCount(1)
            }} slug={slug} />
        </div>
    )
}

export default HandleAddToCart