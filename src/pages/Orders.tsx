import { ReactElement, useEffect } from "react";
import {useState} from "react";
import TableHOC from "../components/admin/TableHOC"
import { Column } from "react-table";
import {Link} from "react-router-dom"
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { useSelector } from "react-redux";

import { CustomError } from "../types/responseTypes";
import toast from "react-hot-toast";
import { RootState } from "../redux/store";
type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement
};

const column: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id"
    },
    {
        Header: "Quantity",
        accessor: "quantity"
    },
    {
        Header: "Amount",
        accessor: "amount"
    },
    {
        Header: "Status",
        accessor: "status"
    },
    {
        Header: "Action",
        accessor: "action"
    },

]


const Orders = () => {
    const {user} = useSelector((state: RootState)=>state.userReducer)
   const {data,isError,error} = useMyOrdersQuery(user?._id!)
   console.log(data)

  if (isError){
    const err = error as CustomError;
    toast.error(err.data.message)
  }


   const[rows,setRows] = useState<DataType[]>([])
    useEffect(()=>{
        if (data){

            setRows(
                data.orders.map((i) => ({
                    _id: i.user?.name!,
                    amount: i.total,
                    discount: i.discount,
                    quantity: i.orderItems.length,
                    status: (
                      <span
                        className={
                          i.status === "Processing"
                            ? "red"
                            : i.status === "Shipped"
                            ? "green"
                            : "purple"
                        }
                      >
                        {i.status}
                      </span>
                    ),
                    action: <Link to={`/order/${i._id}`}>Manage</Link>,
                  }))
            )

        }
  

    },[data])

    
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  );
};


export default Orders