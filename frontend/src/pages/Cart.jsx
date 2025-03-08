import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="bg-green-100 min-h-screen p-8">
      {/* Header Section */}
      <div className="container mx-auto text-center mt-20">
        <h1 className="text-5xl font-bold text-gray-800">Your Shopping Cart</h1>
      </div>

      {/* Empty Cart Message */}
      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-xl mt-10"
        >
          Your cart is empty{" "}
          <Link to="/shop" className="text-pink-500 underline">
            Go To Shop
          </Link>
        </motion.div>
      ) : (
        <div className="container mx-auto mt-12">
          <p className="text-lg text-gray-600 text-center mb-6">
            Review your items and proceed to checkout
          </p>
          {/* Cart Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white p-6 shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="text-lg font-bold mt-4 text-black">
                  {item.name}
                </h2>
                <p className="text-gray-600">{item.brand}</p>
                <p className="text-pink-600 font-semibold text-xl">
                  ${item.price}
                </p>

                {/* Quantity Selector */}
                <div className="mt-3">
                  <select
                    className="w-full p-2 border rounded text-gray-700"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remove Button */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg mt-10"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Cart Summary
            </h2>
            <p className="text-lg font-medium">
              Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Total:{" "}
              <span className="text-pink-500 font-bold">
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </span>
            </p>

            {/* Checkout & Home Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>

              <button
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg w-full"
                onClick={() => navigate("/")}
              >
                Go to Home
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;
