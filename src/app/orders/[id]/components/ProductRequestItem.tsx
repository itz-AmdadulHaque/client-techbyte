import { ProductRequestOrderItemType } from '@/Types/Types';
import { Download } from 'lucide-react';
import Image from 'next/image';

const ProductRequestItemBox = ({ product }: { product: ProductRequestOrderItemType }) => {
    const fileUrl = `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.fileName}`;
    const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(product.fileName);


    return (
        <div className='border p-3 rounded-md my-3 bg-white flex flex-wrap gap-5 items-center relative group'>
            {isImage ? (
                <Image
                    height={70}
                    width={70}
                    className="w-20 h-20 object-contain rounded-md"
                    src={fileUrl}
                    alt={product.title}
                />
            ) : (
                <a
                    href={fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 transition"
                >
                    <Download size={18} />
                    <span>Download PDF</span>
                </a>
            )}


            <div>
                <h2 className='text-xl font-semibold'>{product.title}</h2>

                {product.price
                    ?
                    <p className="text-md mt-4 flex items-center gap-1">

                        <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

                        <span>{product.price} X {product.quantity} = {Number(product.price) * product.quantity}</span>
                    </p>
                    :
                    <p className="text-md mt-4 text-muted-foreground">Price on Request</p>
                }

            </div>
            <p className="ml-auto text-xl font-semibold mt-4 flex items-center">

                <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

                <span>{Number(product.price) * product.quantity}</span>
            </p>

        </div>
    )
}

export default ProductRequestItemBox