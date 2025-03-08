import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="bg-green-100 min-h-screen p-10 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-2xl font-bold text-green-800 mt-10 mb-10">
        ❤️ FAVORITE PRODUCTS ❤️
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
