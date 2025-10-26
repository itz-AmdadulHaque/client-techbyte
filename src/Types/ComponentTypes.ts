export type NavItemType = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    links?: NavItemType[];
}

export type CartProduct = {
    id: string;
    price?: number;
    slug: string;
    title: string;
    images: [{ image: string }];
    expiresAt: string;
    discount: number;
}

export type ProductCartItemType = {
    id: string;
    cartId: string;
    price?:  number;
    productId: string;
    quantity: number;
    createAt: string;
    updatedAt: string;
    product: CartProduct;

}


export type ProductRequestCartItemType = {
    id: string;
    fileName: string;
    title: string;
    cartId: string;
    price?: string | number;
    quantity: number;
    description: string;
    createAt: string;
    updatedAt: string;
}

export type ProductOrderItemType = {
    id: string;
    description: string;
    orderId: string;
    price?: string;
    productId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    product: CartProduct;
}


export type ServiceItemType = {
    id: string;
    cartId: string;
    price?: string | number;
    serviceId: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    service: CartProduct;
}

export type PaymentType = {
    id: string;
    method: string;
    amount: number;
    transactionId: string
    date: string;
    updatedAt: string;
}