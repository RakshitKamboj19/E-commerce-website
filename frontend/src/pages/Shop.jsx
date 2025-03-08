import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="container mx-auto mt-20 bg-green-100 min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-16"
      >
        {/* Centered & Lowered Filter Box */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-[22rem] mt-10">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
            Filters
          </h2>

          {/* Filter by Category */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-700">Categories</h3>
            {categories?.map((c) => (
              <label key={c._id} className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="accent-pink-500"
                />
                <span>{c.name}</span>
              </label>
            ))}
          </div>

          {/* Filter by Price */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-700">Price</h3>
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            className="w-full bg-pink-600 text-white font-semibold py-2 rounded-lg"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            {products?.length} Products Found
          </h2>

          {/* Loader Removed If No Products */}
          {filteredProductsQuery.isLoading ? (
            <Loader />
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600">No products found.</p>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {products?.map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ProductCard p={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Shop;
