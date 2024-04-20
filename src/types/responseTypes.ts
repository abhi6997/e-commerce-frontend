import { OrderItem, Product, User,ShippingInfo } from "./requestTypes";

export type MessageResponse = {
    success: boolean;
    message: string;
  };

  export type UserResponse = {
    success:boolean,
    message:string,
    user:User
  }
  export type AllUsersResponse = {
    success:boolean,
    message:string,
    users:User[]

  }

  export type ProductResponse = {

    success: boolean,
    message:string,
    products:Product[]
  }

  export type CustomError = {
    status: number;
    data:{
      message:string;
      success:boolean
    }
  }

  export type CategoryResponse = {
   
    success: boolean,
    message:string,
    categoryArray:string[]

  }
  export type SearchedProductResponse =  ProductResponse & {
  totalPages : number
  }


  export type SingleProductResponse = {
    success: boolean,
    message:string,
    product:Product
  }
  export type Order = {
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {
      name: string;
      _id: string;
    };
    _id: string;
  };
  
  export type OrderListResponse = {

    success: boolean,
    message:string,
    orders:Order[]
  }
  export type SingleOrderResponse = {
    success: boolean,
    message:string,
    order: Order
  }
  export type modifiedTransaction = {
    _id: string;
    discount: number;
    amount: number;
    quantity: number;
    status: string;
  }
  export type StatisticsResponse = {
    message:string,
    success:boolean,
    statistics:{
      relativeChanges:{ 
        relativeChangeInProduct:number,
        relativeChangeInUsers:number,
        relativeChangeInOrders:number,
        relativeChangeInRevenue:number},
      totalCount:{
        AllCategories:string[],
        totalProducts:number,
        totalUsers:number,
        totalRevenue:number,
        totalFemaleCount:number
      },
      userRatio:{ 
        male: number;
        female: number;},
      latestTransactions:modifiedTransaction[],
      EachCategoryPercentage:Record<string,number>[],
      chart:{
        monthlyOrdersCount:number[],
        monthlyRevenueCount:number[],
      }

    }

  }

  export type getPieChartsResponse = {

    message:string,
    success:boolean,
    pieCharts:{
      orderFullfillment:{
        processing: number,
        shipped: number,
        delivered: number,
      },
      EachCategoryPercentage: Record<string,number>[],
      stockAvailablity:{
          inStock: number;
          outOfStcock: number;},
          
      revenueDistribution: {
            netMargin: number;
            discount: number;
            productionCost: number;
            burnt: number;
            marketingCost: number;
        },
      usersAgeGroup: {
          teen: number;
          adult: number;
          old: number;
        },
      usersTypeCount: {
        admin: number;
        customer: number;
        },
    }
 
  }

  export type getBarChartsResponse = {
    message:string,
    success:boolean,
    barCharts:{
      users:number[],
    products:number[],
    orders:number[],

    }
    
  }

 export type getLineChartsResponse = {
  message:string,
  success:boolean,
    lineCharts:{
      users:number[],
      products:number[],
      discount:number[],
      revenue:number[]
    }
      
  }