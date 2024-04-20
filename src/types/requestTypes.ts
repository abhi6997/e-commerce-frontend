export type User = {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
}

export type Product = {
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
  };

  export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
  
  export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
  };

  export type searchParameterRequest = {
    search:string,
    sort: string,
    price:number,
    category:string,
    page:number
  }

  export type NewProductRequest = {
    id: string;
    formData: FormData;
  };
  export type UpdateProductRequest = {
    userId:string,
    productId:string,
    formData: FormData
  }

  export type DeleteProductRequest = {
    productId: string,
    userId : string
  }
  export type NewOrderRequest = {
      shippingInfo:ShippingInfo,
      orderItems:CartItem[],
      user:string,
      subTotal:number,
      tax:number,
      shippingCharges:number,
      discount:number,
      total:number,
      

  }
  export type OrderItem = Omit< CartItem,"stock"> & {
   _id:string
  };
  export type processOrderRequest = {
   userId:string,
   orderId:string
  }
  export type deleteUserRequest = {
    userId:string,
    adminId:string
  }