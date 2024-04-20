import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import Loader from "../components/admin/Loader";
import { CartItem } from "../types/requestTypes";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
const Home = () => {

  const dispatch = useDispatch();
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const {user} = useSelector((state: RootState)=>state.userReducer)


  const addToCartHandler = (cartItem: CartItem) => {
    if (user){
      if (cartItem.stock < 1){
        return toast.error("Out of Stock");
      } else{
        dispatch(addToCart(cartItem));
      toast.success("Added to cart");
      }
    }else {
      toast.error("Please login")
    }
   
    
  };
  if (isError) toast.error("Products Not Found")
  return (
    <div className="home">

      <section>

      </section>
      <h1>latest Product
        <Link to="/search" className="findmore">More</Link>
      </h1>

      <main>
        {isLoading ? (<Loader />) : (data?.products.map((i) => (<ProductCard
          key={i._id}
          productId={i._id}
          name={i.name}
          price={i.price}
          stock={i.stock}
          handler={addToCartHandler}
          photo={i.photo}

        />)))}





      </main>
    </div>
  )
}

export default Home