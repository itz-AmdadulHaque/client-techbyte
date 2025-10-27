"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

const ContactAdmin = () => {

    const handleCallClick = () => {
        window.location.href = "tel:+8801320504151";
    };
    return (
        <Button variant="outline" onClick={handleCallClick}>Contact Admin</Button>
    )
}

export default ContactAdmin