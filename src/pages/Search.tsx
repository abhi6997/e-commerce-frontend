import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAllCategoriesQuery, useSearchedProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/responseTypes";
import { CartItem } from "../types/requestTypes";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";




const Search = () => {

  const dispatch= useDispatch();
  const [search, setSearch] = useState("")
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
 

  //this is for fetching all categories
  const { data: categoryResponse ,isLoading:loadingCategories,isError,error} = useAllCategoriesQuery("");
  const categoryArray = categoryResponse?.categoryArray
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  //this is for fetching all searchedproducts

  const {data:searchedProductResponse,isLoading:loadingSearchedProducts,isError:productIsError,error:productError} = useSearchedProductsQuery({search,price:maxPrice,sort,category,page})
  const totalPages = searchedProductResponse?.totalPages
  const isPrevPage = page > 1;
  const isNextPage = page < totalPages!;

  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1){
      return toast.error("Out of Stock");
    } else{
      dispatch(addToCart(cartItem));
    toast.success("Added to cart");
    }
  }
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select name="sort" id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc"> High to Low</option>
          </select>


          <div><h4>Max-Price:{maxPrice || ""}</h4></div>
          <input type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}


          />
        </div>

        <div>
          <h4>Category</h4>

          <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>


             {!loadingCategories && categoryArray?.map((i, index) => (<option key={index} value={i}>
              {i}
            </option>))}



          </select>
        </div>

      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search by name....."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        <div className="product-list">

          {!loadingSearchedProducts && searchedProductResponse?.products.map((i)=>(
          <ProductCard
            key = {i._id}
            productId={i._id}
            name={i.name}
            price={i.price}
            handler={addToCartHandler}
            photo={i.photo}
            stock = {i.stock}
          
          />))}
         
         
        </div>


        <article>
          <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
          <span>{page} of {searchedProductResponse?.totalPages}</span>
          <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </article>
      </main>


    </div>
  )
}

export default Search