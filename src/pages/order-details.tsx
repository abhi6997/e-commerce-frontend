
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import { OrderItem } from "../types/requestTypes";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSpecificOrderQuery,useDeleteOrderMutation } from "../redux/api/orderApi";

import { Order } from "../types/responseTypes";
import { Navigate } from "react-router-dom";
import { responseToast } from "../utils/features";
import { RootState } from "../redux/store";


const orderDetails = () => {
  const navigate = useNavigate();
 
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError } = useSpecificOrderQuery(`${id}`);
  const [orderData, setOrderData] = useState<Order | null>(null);

  useEffect(() => {
    if (data && data.order) {
      setOrderData(data.order);
    }
  }, [data]);

  const [deleteOrder] = useDeleteOrderMutation();

  

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };
  if (isError) {
    return <Navigate to="/404" />;
  }

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const {
    orderItems,
    shippingInfo,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    user: orderWalaUser,
    status,
  } = orderData;

  const { address, city, state, country, pinCode } = shippingInfo;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section style={{ padding: "2rem" }}>
          <h2>Order Items</h2>
          {orderItems.map((item) => (
            <ProductCard
              key={item._id}
              name={item.name}
              photo={item.photo}
              productId={item.productId}
              _id={item._id}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </section>

        <article className="shipping-info-card">
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {orderWalaUser?.name!}</p>
          <p>
            Address:{" "}
            {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>
         
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default orderDetails;