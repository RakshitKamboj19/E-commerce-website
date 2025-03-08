import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="p-3 relative rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-60 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-gray-900">
            <div className="text-lg font-semibold">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
