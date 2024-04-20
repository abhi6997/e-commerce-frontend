import { signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '../firebase'
import toast from 'react-hot-toast'
import { useLoginMutation } from '../redux/api/userApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { MessageResponse } from '../types/responseTypes'
import { Navigate, useNavigate } from 'react-router-dom'
const Login = () => {
    const [gender, setGender] = useState("")
    const [date, setDate] = useState("")
    const[login] = useLoginMutation();

    const loginHandler = async()=>{
    try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth,provider);
        

     
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo:user.photoURL!,
        gender,
        role:"user",
        dob:date,
        _id:user.uid,


      })
      

     
      if ("data" in res){
        toast.success(res.data.message);
    
        <Navigate to="/"/>
        
      
      }else{
       
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
      


    } catch (error) {
        
        toast.error("Sign In Fail");
    }
    }
    return (
        <div className='login'>
            <main>
                <h1 >Login</h1>

                <div>
                    <label htmlFor='gender'>Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">female</option>

                    </select>


                </div>
                <div>
                    <label htmlFor='date'>Date</label>
                    <input 
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}

                    />
                </div>

                
                <button onClick={loginHandler}>
                    <FcGoogle/> <span>Sign in with Google</span>
                </button>
            </main>

        </div>
    )
}
export default Login