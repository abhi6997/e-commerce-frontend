import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Loader from "./components/Loader.tsx"
import "./styles/app.scss"
import Header from './components/Header.tsx'
import { Toaster } from 'react-hot-toast'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.ts'
import { getUser } from './redux/api/userApi.ts'
import { useDispatch } from 'react-redux'
import { userExist, userNotExist } from './redux/reducer/userReducer.ts'
import { useSelector } from 'react-redux'

import { UserReducerInitialState } from './types/reducerTypes.ts'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { RootState } from './redux/store.ts'





const Login = lazy(() => import("./pages/Login"))
const Home = lazy(() => import("./pages/Home"))
const Cart = lazy(() => import("./pages/Cart"))
const Search = lazy(() => import("./pages/Search"))
const Shipping = lazy(() => import("./pages/Shipping.tsx"))
const Orders = lazy(() => import("./pages/Orders.tsx"))
const NotFound = lazy(()=> import("./pages/not-found"))
const CheckOut = lazy(()=> import("./pages/checkOut"))
const OrderDetails = lazy(()=> import("./pages/order-details"))

//Admin Dashboard

const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);



function App() {

  const { user, loading } = useSelector((state:RootState) => state.userReducer)
  


  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
    
        const res = await getUser(user.uid)
        console.log(user.uid)


        dispatch(userExist(res.user))

      } else{
        
        dispatch(userNotExist())

      } 
    })

  }, [user])

  return (

    loading ? (<Loader />) : (
      <Router>
        <Header user={user} />


        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />

            {/* Not logged in routed*/}

            <Route
              path='/login'
              element={

                <ProtectedRoute isAuthenticated={user ? false : true} >
                  <Login />
                </ProtectedRoute>
              }

            />




            {/*Logged in routed*/}
            <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
             

            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/orders' element={<Orders />}/>
            <Route path = '/order/:id' element = {<OrderDetails/>}/>
            <Route path = "/pay" element = {<CheckOut/>}/>

            </Route>

     


            {/* Admin */}

            <Route
              element={
                <ProtectedRoute isAuthenticated={user ? true : false} onlyAdminAccessible={true} isAdmin={user?.role === "admin" ? true : false} />
              }
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<Products />} />
              <Route path="/admin/customer" element={<Customers />} />
              <Route path="/admin/transaction" element={<Transaction />} />
              {/* Charts */}
              <Route path="/admin/chart/bar" element={<Barcharts />} />
              <Route path="/admin/chart/pie" element={<Piecharts />} />
              <Route path="/admin/chart/line" element={<Linecharts />} />
              {/* Apps */}
              <Route path="/admin/app/coupon" element={<Coupon />} />
              <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
              <Route path="/admin/app/toss" element={<Toss />} />

              {/* Management */}
              <Route path="/admin/product/new" element={<NewProduct />} />

              <Route path="/admin/product/:id" element={<ProductManagement />} />

              <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
              
            </Route>
            <Route path ="*" element={<NotFound/>}/>


          </Routes>
        </Suspense>
        <Toaster position="bottom-center" />
      </Router>
    )




  )
}

export default App
