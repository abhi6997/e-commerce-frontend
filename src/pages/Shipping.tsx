import { useForm } from "react-hook-form"
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { addShippingAddress } from "../redux/reducer/cartReducer";
import { ShippingInfo } from "../types/requestTypes";
import toast from "react-hot-toast";
import axios from "axios";

import { RootState } from "../redux/store";



const Shipping = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.userReducer);
    const { cartItems,total, shippingInfo } = useSelector((state: RootState) => state.cartReducer)
   
    const navigate = useNavigate();
    

    useEffect(() => {
       
        if (cartItems.length < 1) navigate("/cart")
    }, [cartItems])

    const checkingOut = async (data: ShippingInfo, shippingInfo: ShippingInfo) => {
        
        dispatch(addShippingAddress(data))
      
        try {
          

            const { data } = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/payment/create`, 
            { amount: total,shippingInfo,name:user?.name! }, 
            { headers: { "Content-Type": "application/json" } 
        })
        navigate("/pay",{state:data.clientSecret})

        } catch (error) {
            toast.error("Something went wrong")
        }


    }

    const { register, handleSubmit } = useForm<ShippingInfo>();
   
    
   



    // const {register,handleSubmit} = useForm();

    return (
        <div className="shipping">
            <button className="bck-btn" onClick={() => (navigate("/cart"))}><BiArrowBack /></button>

            <form onSubmit={handleSubmit((data)=>checkingOut(data,shippingInfo))}>
                <h1>SHIPPING ADDRESS</h1>
                <input
                    type="text"
                    placeholder="Address"
                    {...register("address", { required: true })}
                />

                <input
                    type="text"
                    placeholder="City"
                    {...register("city", { required: true })}
                />

                <input
                    type="text"
                    placeholder="State"
                    {...register("state", { required: true })}
                />

                <input
                    type="text"
                    placeholder="Pin Code"
                    {...register("pinCode", { required: true })}
                />


                <select
                    id="country"
                    {...register("country", { required: true })}

                >
                   
                    <option value="India">India</option>
                    <option value="Srilanka">Srilanka</option>
                    <option value="China">China</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Afghanistan">Afghanistan</option>


                </select>

                <button type="submit">Pay Now</button>

            </form>
        </div>
    )
}

export default Shipping