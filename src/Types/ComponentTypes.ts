export type NavItemType = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    links?: NavItemType[];
}

export type CartProduct = {
    id: string;
    price?: string | number;
    slug: string;
    title: string;
    images: [{ image: string }]
}

export type ProductItemType = {
    id: string;
    cartId: string;
    price?: string | number;
    productId: string;
    quantity: number;
    createAt: string;
    updatedAt: string;
    product: CartProduct;
}


export type ServiceItemType = {
    id: string;
    cartId: string;
    price?: string | number;
    serviceId: string;
    description: string;
    createAt: string;
    updatedAt: string;
    service: CartProduct;
}