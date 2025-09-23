export const orderStatus = [
    "PENDING",
    "IN_PROGRESS",
    "PARTIALLY_DONE",
    "COMPLETED",
    "CANCELLED",
    "REJECTED"
]

export const productGroupStatus = [
    "PENDING_PRICE",
    "QUOTED",
    "CONFIRMED",
    "PACKED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "REJECTED"
]


export const serviceGroupStatus = [
    "PENDING_PRICE",
    "QUOTED",
    "CONFIRMED",
    "ONGOING",
    "COMPLETED",
    "CANCELLED",
    "REJECTED"
]


export const requestGroupStatus = [
    "PENDING_REVIEW",
    "PENDING_PRICE",
    "QUOTED",
    "APPROVED",
    "CONFIRMED",
    "FULFILLED",
    "CANCELLED",
    "REJECTED"
]


export const paymentMethods = [
    "CASH",
    "BANK_TRANSFER",
    "CARD",
    "BKASH",
    "NAGAD",
    "OTHER",
] as const;
