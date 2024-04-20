import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/requestTypes";
import { useNavigate } from "react-router-dom";

type ProductProps={
    productId:string;
    photo:string;
    name:string;
    price:number;
    stock:number;
    handler: (CartItem:CartItem)=> string | undefined;


}


const ProductCard = ({productId,photo,name,price,stock,handler}:ProductProps) => {

  const navigate = useNavigate();
  return (
    <div className="productcard">

      <img src={`${photo}`} alt="{name}" />
      <p>{name}</p>
      <span>₹{price}</span>
      <div><button onClick={()=>
        {
          handler({productId,photo,name,price,stock,quantity:1})
          navigate("/cart")

        }}><FaPlus/></button></div>
    </div>
  )
}

export default ProductCard