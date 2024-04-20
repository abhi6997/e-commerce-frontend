
import { FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
import { CartItem } from "../types/requestTypes"
type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;

}

const CartItemCard = (
  { cartItem,
    incrementHandler,
    decrementHandler,
    removeHandler }: CartItemProps) => {


  const { photo, productId, name, price, quantity, stock } = cartItem




  return (
    <div className="cart-item">
      <img src={photo} alt="" />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={()=>removeHandler(productId)}><FaTrash /></button>
    </div>
  )
}

export default CartItemCard