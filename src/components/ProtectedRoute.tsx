import  { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom';


interface PropsType{
    children? : ReactElement;
    isAuthenticated :boolean;
    onlyAdminAccessible?: boolean;
    isAdmin? : boolean;
    redirect?:string;
}
const ProtectedRoute = ({isAuthenticated,children,onlyAdminAccessible,isAdmin,redirect = "/"} : PropsType) => {

  if (!isAuthenticated) return <Navigate to={redirect}/>
  if (onlyAdminAccessible && !isAdmin) return <Navigate to={redirect}/>

  return children ? children : <Outlet/>
}

export default ProtectedRoute