
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/CartItemCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/requestTypes";
import { removeFromCart } from "../redux/reducer/cartReducer";
import { toast } from "react-hot-toast";
import { calculatePrice } from "../redux/reducer/cartReducer";
import axios from "axios";
import { discountApplied } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";





const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, subTotal, shippingCharges, tax, discount, total } = useSelector((state:RootState) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isCouponCodeValid, setIsCouponCodeValid] = useState<boolean>(false)


  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) {
        toast.error("Out of Stock")
    }else{
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }))
    }

   

  }

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) {
      dispatch(removeFromCart(cartItem.productId)); 
      toast.success("Item removed from cart")
  }else{
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }))
  }
  };


  const removeHandler = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart")
  };
  useEffect(()=>{
    dispatch(calculatePrice())
  },[cartItems])


  useEffect(() => {

    const {token:cancelToken,cancel} = axios.CancelToken.source()
    if (couponCode.length ===0) return
    const TimeOutId = setTimeout(() => {
    axios.get(`${import.meta.env.VITE_SERVER}/api/v1/payment/discount?couponCode=${couponCode}`,{cancelToken}).then((res)=>{
      dispatch(discountApplied(res.data.discountAmount))
      setIsCouponCodeValid(true)
      dispatch(calculatePrice())
    }).catch(()=>{ 
      dispatch(discountApplied("0"))
      setIsCouponCodeValid(false);
      dispatch(calculatePrice())
     
    
    })

   
    }, 1000)

    return () => {
      clearTimeout(TimeOutId);
      cancel();
      setIsCouponCodeValid(false)
    }
  }, [couponCode])
  return (
    <div className="cart">
      <main>

        {cartItems.length > 0 ? (cartItems.map((i, index) => (<CartItemCard key={index} incrementHandler={incrementHandler}
          removeHandler={removeHandler}
          cartItem={i}

          decrementHandler={decrementHandler} />)

        )) : (<h1>No Items Added</h1>)}


      </main>
      <aside>
        <p>{`SubTotal: ₹${subTotal}`}</p>
        <p>{`Shipping CHarges: ₹${shippingCharges}`}</p>
        <p>{`Tax: ₹${tax}`}</p>
        <p>{`Discount: ₹${discount}`}</p>
        <p>{`Total: ₹${total}`}</p>
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)} />
        {couponCode && (isCouponCodeValid ? (<span className="green">₹{discount} off using <code>{couponCode}</code></span>) :
          (<span className="red"> Invalid Coupon Code {<VscError />}</span>)

        )}


        {
          cartItems.length > 0 && (<Link to="/shipping">Checkout</Link>)
        }

      </aside>

    </div>
  )
}

export default Cart