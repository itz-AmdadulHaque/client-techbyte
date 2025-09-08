"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCartInfo } from '@/hooks/useCartInfo';
import { ProductItemType } from '@/Types/ComponentTypes';
import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react'
import ProductItemBox from './components/ProductItemBox';
import ServiceItemBox from './components/ServiceItemBox';

const Cart = () => {
  const { data: cartInfo } = useCartInfo();

  const [productOpen, setProductOpen] = useState(true)
  const [serviceOpen, setServiceOpen] = useState(true)
  const [productRequestOpen, setProductRequestOpen] = useState(true)

  const products = cartInfo?.productItems ?? [];
  const services = cartInfo?.serviceItems ?? [];
  return (
    <div className='container mx-auto min-h-screen'>

      <div>
        <h1 className='text-2xl font-bold p-6'>Shopping Cart</h1>
      </div>

      <div className='lg:grid grid-cols-4'>

        <div className='col-span-3'>



          {/* product */}
          <Collapsible
            open={productOpen}
            onOpenChange={setProductOpen}
            className='border px-6 py-4 w-full text-left rounded-md bg-muted mt-6'
          >
            <CollapsibleTrigger className='w-full text-xl font-semibold flex justify-between mb-2'>
              <p>Products</p>

              {
                productOpen ? <Minus strokeWidth={2.5} /> : <Plus strokeWidth={2.5} />
              }
            </CollapsibleTrigger>
            <CollapsibleContent>

              {
                products.map((productItem: ProductItemType) => <ProductItemBox key={productItem.id} product={productItem} />
                )
              }

            </CollapsibleContent>
          </Collapsible>



          {/* service */}
          <Collapsible
            open={serviceOpen}
            onOpenChange={setServiceOpen}
            className='border px-6 py-4 w-full text-left rounded-md bg-muted mt-6'
          >
            <CollapsibleTrigger className='w-full text-xl font-semibold flex justify-between mb-2'>
              <p>Services</p>

              {
                serviceOpen ? <Minus strokeWidth={2.5} /> : <Plus strokeWidth={2.5} />
              }
            </CollapsibleTrigger>
            <CollapsibleContent>

              {
                services.map((serviceItem: ProductItemType) => <ServiceItemBox key={serviceItem.id} service={serviceItem} />
                )
              }

            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}

export default Cart