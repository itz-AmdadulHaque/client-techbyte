"use client";

import { Button } from '@/components/ui/button';
import React from 'react'

const AddToCart = ({ variant, id }: { variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost", id: string }) => {

    const handleAddToCart = () => {
        console.log(id);
    }

    return (
        <Button variant={variant} onClick={() => handleAddToCart()}>ADD TO CART</Button>
    )
}

export default AddToCart