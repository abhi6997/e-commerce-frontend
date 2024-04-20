import { ReactElement, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { CustomError } from "../../types/responseTypes";
import { useEffect } from "react";
import { responseToast } from "../../utils/features";

import { FaChessKing } from "react-icons/fa"

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Customers = () => {

  const [deleteUser] = useDeleteUserMutation();
  const {user} = useSelector((state: RootState)=>state.userReducer)
  const {data,isError,error} = useGetAllUsersQuery(user?._id!)
  
  if (isError){
    const err = error as CustomError
    toast.error(err.data.message)
  }
  const [rows, setRows] = useState<DataType[]>([]);
  const deleteHandler = async(userId: string)=>{
    const res = await deleteUser({userId,adminId:user?._id!})
    responseToast(res,null,"")
  };

  useEffect(() => {
    if (data) setRows(data.users.map((i)=>({
      avatar: <img src={i.photo} alt="" />,
      name: i.name,
      email: i.email,
      gender: i.gender,

      role:i.role,

      action: i.role ==="admin"?<FaChessKing  style={{ fontSize: '24px' }}/>: <button onClick={()=>deleteHandler(i._id)}><FaTrash style={{ fontSize: '24px' }}/></button>

    })))
      
        
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
