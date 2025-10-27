import React from 'react'
import { Metadata } from 'next';
import ProductRequestForm from './components/RequestForm';



export const metadata: Metadata = {
  title: "Product Request | TechVibe Global",
  description:
    "We can provide all the essential products needed for our services — including CCTV systems, computers, laptops, printers, projectors, accessories, fire safety equipment, and more. If you do not find your desired product then submit the request.",
};

const ProductRequest = () => {
  return (
    <ProductRequestForm />
  )
}

export default ProductRequest