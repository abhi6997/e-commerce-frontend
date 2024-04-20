import { User, CartItem,ShippingInfo } from "./requestTypes";


export type UserReducerInitialState = {
    user:User | null,
    loading :boolean
}

export type CartReducerInitialState = {
    loading: boolean;
    cartItems: CartItem[];
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: ShippingInfo;
}