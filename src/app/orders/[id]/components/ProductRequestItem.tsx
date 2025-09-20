import { ProductRequestOrderItemType } from '@/Types/Types';
import Image from 'next/image';

const ProductRequestItemBox = ({ product }: { product: ProductRequestOrderItemType }) => {

    

    return (
        <div className='border p-3 rounded-md my-3 bg-white flex flex-wrap gap-5 items-center relative group'>
            <Image
                height={70}
                width={70}
                className='w-20 h-20 object-contain'
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.fileName}`}
                alt={product.title}
            />


            <div>
                <h2 className='text-xl font-semibold'>{product.title}</h2>

                {product.price
                    ?
                    <p className="text-md mt-4 flex items-center gap-1">

                        <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

                        <span>{product.price}</span>
                    </p>
                    :
                    <p className="text-md mt-4 text-muted-foreground">Price on Request</p>
                }


            </div>
            
        </div>
    )
}

export default ProductRequestItemBox