import { Product } from "@/Types/Types";
import Image from "next/image";

export default function ProductPrice({ product }: { product: Product }) {
    if (!product.price) {
        return (
            <div className="text-muted-foreground flex items-center font-semibold gap-2">
                Price on Request
            </div>
        );
    }

    const now = new Date();
    const hasDiscount =
        product.discount &&
        product.expiresAt &&
        new Date(product.expiresAt) > now;

    if (hasDiscount) {
        const discountedPrice =
            product.price - product.discount;

        return (
            <div className="text-muted-foreground font-semibold text-center gap-2 ">
                {/* <Image src="/taka.png" alt="Taka symbol" width={20} height={20} /> */}
                <p className=" line-through text-sm text-gray-400">BDT {product.price}</p>
                <p className="font-bold text-xl  text-red-600">BDT {discountedPrice}</p>
            </div>
        );
    }

    return (
        <div className="text-muted-foreground text-xl font-semibold flex items-center gap-2">
            {/* <Image src="/taka.png" alt="Taka symbol" width={20} height={20} /> */}
            <p className="text-md font-bold">BDT {product.price}</p>
        </div>
    );
}