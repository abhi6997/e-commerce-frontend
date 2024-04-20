import { ChangeEvent,  useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminSidebar from "../../../components/admin/AdminSidebar";

import { RootState } from "../../../redux/store";

import { useRegisterProductMutation } from "../../../redux/api/productApi";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { register, handleSubmit,setValue} = useForm();
  const [photoPrev, setPhotoPrev] = useState<string>("");
  
  const [newProduct] = useRegisterProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setValue("photo",file)
        }
      };
    }
  };

  const submit = async (data: any) => {
    
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("price", data.price);
    formData.set("stock", data.stock);
    formData.set("photo",data.photo);
    formData.set("category", data.category);

    const res = await newProduct({ id: user?._id!, formData });
   
      responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={handleSubmit(submit)}>
            <h2>New Product</h2>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                {...register("name",{ required: true })}
              />
             
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                placeholder="Price"
                {...register("price",{ required: true })}
              />
             
            </div>
            <div>
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                type="number"
                placeholder="Stock"
                {...register("stock",{ required: true })}
              />
           
             
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id = "category"
                type="text"
                placeholder="eg. laptop, camera etc"
               {...register("category",{ required: true })}
              />
              
            </div>
            <div>
              <label htmlFor="photo">Photo</label>
              <input
              id="photo"
               type="file"
               onChange={(e) => {
              changeImageHandler(e); // Call your custom image handler
              // Use React Hook Form's onChange
  }}
/>
            
            </div>
            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
