"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCartInfo } from '@/hooks/useCartInfo';
import { ProductCartItemType, ProductRequestCartItemType, ServiceItemType } from '@/Types/ComponentTypes';
import { Minus, Plus } from 'lucide-react';
import React, { useState, useMemo } from 'react'
import ProductItemBox from './components/ProductItemBox';
import ServiceItemBox from './components/ServiceItemBox';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { orderInfoSchema, OrderInfoSchema } from '@/validators/orderInfo.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryClient } from '@/Provider/ReactQueryClientProvider';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import ProductRequestItemBox from './components/ProductRequestItemBox';
import { LoadingOverlay } from '@/components/custom/LoadingOverlay/LoadingOverlay';

const Cart = () => {
  const { data: cartInfo } = useCartInfo();

  const [productOpen, setProductOpen] = useState(true)
  const [serviceOpen, setServiceOpen] = useState(true)
  const [productRequestOpen, setProductRequestOpen] = useState(true)

  const products = cartInfo?.productItems ?? [];
  const services = cartInfo?.serviceItems ?? [];
  const productRequests = cartInfo?.productRequests ?? [];

  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  const { auth, isLoading } = useAuth();

  const form = useForm<OrderInfoSchema>({
    resolver: zodResolver(orderInfoSchema),
    defaultValues: {
      phone: auth.user?.phone || "",
      address: auth?.user?.address || "",
      thana: auth?.user?.thana || "",
      district: auth?.user?.district || "",
    },
  });

  const submitOrder = async (data: OrderInfoSchema) => {
  
    const res = await axiosPrivate.post(`/orders`, data);
    return res;
  }

  const { mutate: handleOrder, isPending } = useMutation({
    mutationKey: ["confirmOrder"],
    mutationFn: submitOrder,
    onSuccess: (data) => {

      toast.success("Order submitted", { position: 'top-center' });
      
      router.push('/profile?tab=orders')

    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: 'top-center' });
      console.error("Update failed:", error);
    },
  });

  // ✅ Calculate derived values without setState in render
  const { totalPrice, allProductHasPrice } = useMemo(() => {
    let total = 0;
    let allHasPrice = true;

    for (const productItem of products) {
      if (!productItem.product.price) {
        allHasPrice = false;
      } else {
        total += (Number(productItem.product.price) * productItem.quantity);
      }
    }

    return { totalPrice: total, allProductHasPrice: allHasPrice };
  }, [products]);

  return (
    <div className='container mx-auto min-h-screen'>

      {isLoading}

      <LoadingOverlay visible={isPending} blur />
      
      <div>
        <h1 className='text-2xl font-bold p-6'>Shopping Cart</h1>
      </div>

      <div className='lg:grid grid-cols-4 gap-2'>


        <div className='col-span-3'>


          {/* product */}
          {products.length > 0 && (
            <Collapsible
              open={productOpen}
              onOpenChange={setProductOpen}
              className='border px-6 py-4 w-full text-left rounded-md bg-muted mt-6'
            >
              <CollapsibleTrigger className='w-full text-xl font-semibold flex justify-between mb-2'>
                <p>Products</p>
                {productOpen ? <Minus strokeWidth={2.5} /> : <Plus strokeWidth={2.5} />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                {products.map((productItem: ProductCartItemType) => (
                  <ProductItemBox key={productItem.id} product={productItem} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}


          {/* service */}
          {services.length > 0 && (
            <Collapsible
              open={serviceOpen}
              onOpenChange={setServiceOpen}
              className='border px-6 py-4 w-full text-left rounded-md bg-muted mt-6'
            >
              <CollapsibleTrigger className='w-full text-xl font-semibold flex justify-between mb-2'>
                <p>Services</p>
                {serviceOpen ? <Minus strokeWidth={2.5} /> : <Plus strokeWidth={2.5} />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                {services.map((serviceItem: ServiceItemType) => (
                  <ServiceItemBox key={serviceItem.id} service={serviceItem} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}


          {/* product-request */}
          {productRequests.length > 0 && (
            <Collapsible
              open={productRequestOpen}
              onOpenChange={setProductRequestOpen}
              className='border px-6 py-4 w-full text-left rounded-md bg-muted mt-6'
            >
              <CollapsibleTrigger className='w-full text-xl font-semibold flex justify-between mb-2'>
                <p>Product Requests</p>
                {productRequestOpen ? <Minus strokeWidth={2.5} /> : <Plus strokeWidth={2.5} />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                {productRequests.map((productItem: ProductRequestCartItemType) => (
                  <ProductRequestItemBox key={productItem.id} product={productItem} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* address form */}
          <div className='p-4 border my-6 rounded-md'>
            <p className='my-4 font-bold'>Address details</p>
            <Form {...form}>
              <form
                id='order-address'
                onSubmit={form.handleSubmit(
                  (data) => handleOrder(data),
                  (errors) => {
                    const firstErrorField = Object.keys(errors)[0];
                    if (firstErrorField) {
                      const element = document.querySelector<HTMLInputElement>(
                        `[name="${firstErrorField}"]`
                      );
                      element?.scrollIntoView({ behavior: "smooth", block: "center" });
                      element?.focus();
                    }
                  }
                )}
                className="grid md:grid-cols-2 gap-3"
              >


                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <Input type="text" placeholder="Phone Number" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <Input type="text" placeholder="District" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thana"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thana</FormLabel>
                      <Input type="text" placeholder="Thana" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <Input type="text" placeholder="Address" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

        </div>


        {/* order summary */}
        <div>
          <div className='min-h-96 border-2 m-4 p-4 rounded-md text-sm'>

            <p className='text-xl font-semibold mb-4'>Order Summary</p>

            <p className='flex justify-between items-center'>

              <span>{`Products (${products.length})`}</span>

              {allProductHasPrice ?
                <span className='flex items-center gap-1'>
                  <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />
                  {totalPrice}
                </span>
                :
                <span className='text-muted-foreground'>Quote Required</span>
              }

            </p>


            <p className='flex justify-between items-center my-2'>

              <span>{`Services (${services.length})`}</span>


              <span className='text-muted-foreground'>Quote Required</span>

            </p>


            <p className='flex justify-between items-center'>

              <span>{`Product Requests (${productRequests.length})`}</span>


              <span className='text-muted-foreground'>Quote Required</span>

            </p>

            <div className='border-t-2 my-2'></div>

            <p className='flex justify-between items-center'>

              <span>Total</span>

              {!allProductHasPrice || services.length > 0 || productRequests.length > 0 ?
                <span className='text-muted-foreground'>Quote Required</span>
                :
                <span className='flex items-center gap-1'>
                  <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />
                  {totalPrice}
                </span>
              }

            </p>

            {
              (!allProductHasPrice || services.length > 0 || productRequests.length) > 0 && <div className="mt-6 p-3 border rounded-md bg-yellow-50 text-yellow-800 text-sm">
                Some items require pricing approval
              </div>
            }

            <Button
              className='w-full mt-5'
              type='submit'
              form='order-address'
              disabled={isPending}

            >
              {isPending ? "Confirming..." : "Confirm Order"}
            </Button>


            <div className="mt-6 p-3 border rounded-md text-muted-foreground text-sm">
              We will contact you within <span className="font-semibold">24 to 48 hours</span>
              regarding your order details and confirmation.
            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Cart;
