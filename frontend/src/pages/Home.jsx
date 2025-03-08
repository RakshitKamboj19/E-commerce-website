import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  // Categories with 5 products each
  const categories = {
    "Mobiles & Accessories": [
      { _id: "1", name: "Smartphone X", price: "₹49,999", rating: 4.7, image: "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { _id: "2", name: "Wireless Earbuds", price: "₹29,999", rating: 4.5, image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { _id: "3", name: "Smart Watch", price: "₹3,999", rating: 4.6, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { _id: "4", name: "Power Bank 10000mAh", price: "₹1,299", rating: 4.4, image: "https://images.unsplash.com/photo-1586253634019-c77872f966f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { _id: "5", name: "Gaming Headset", price: "₹4,999", rating: 4.8, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1976&auto=format&fit=crop" },
    ],
    "Groceries": [
      { _id: "6", name: "Organic Honey", price: "₹399", rating: 4.8, image: "https://images.unsplash.com/photo-1481900369621-54a7facacc6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JnYW5pYyUyMGhvbmV5fGVufDB8fDB8fHww" },
      { _id: "7", name: "Green Tea Pack", price: "₹299", rating: 4.6, image: "https://images.unsplash.com/photo-1728977627308-1100ae430cef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JlZW4lMjB0ZWElMjBwYWNrfGVufDB8fDB8fHww" },
      { _id: "8", name: "Almonds (500g)", price: "₹799", rating: 4.7, image: "https://images.unsplash.com/photo-1615485737457-f07082c77813?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D" },
      { _id: "9", name: "Olive Oil (1L)", price: "₹1,299", rating: 4.5, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xpdmUlMjBvaWx8ZW58MHx8MHx8fDA%3D" },
      { _id: "10", name: "Protein Cereal", price: "₹499", rating: 4.6, image: "https://images.unsplash.com/photo-1504308805006-0f7a5f1f0f71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvdGllbiUyMGNlcmVhbHxlbnwwfHwwfHx8MA%3D%3D" },
    ],
    "Fashion": [
      { _id: "11", name: "Men's Leather Jacket", price: "₹3,999", rating: 4.9, image: "https://plus.unsplash.com/premium_photo-1691367279376-624618a5aac9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVucyUyMGxhdGhlciUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D" },
      { _id: "12", name: "Stylish Sneakers", price: "₹2,499", rating: 4.7, image: "https://images.unsplash.com/photo-1706980592027-8ec24dcc3441?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0eWxpc2glMjBzbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D" },
      { _id: "13", name: "Women's Handbag", price: "₹1,999", rating: 4.5, image: "https://images.unsplash.com/photo-1554744982-2b61399b229a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWFuJTIwaGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D" },
      { _id: "14", name: "Trendy Sunglasses", price: "₹1,299", rating: 4.8, image: "https://plus.unsplash.com/premium_photo-1692809752609-0d151a4dc1ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJlbmR5JTIwc3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D" },
      { _id: "15", name: "Cotton T-shirt", price: "₹699", rating: 4.6, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dG9uJTIwdHNoaXJ0fGVufDB8fDB8fHww" },
    ],
    "Beauty": [
      { _id: "16", name: "Luxe Hydrating Lipstick", price: "₹999", rating: 4.5, image: "https://images.unsplash.com/photo-1714420076326-476283c9fcfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8THV4ZSUyMEh5ZHJhdGluZyUyMExpcHN0aWNrfGVufDB8fDB8fHww" },
      { _id: "17", name: "Glow Facial Serum", price: "₹1,499", rating: 4.8, image: "https://images.unsplash.com/photo-1648712787778-1a521521bd1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjaWFsJTIwc2VydW18ZW58MHx8MHx8fDA%3D" },
      { _id: "18", name: "Silk Touch Foundation", price: "₹1,799", rating: 4.7, image: "https://images.unsplash.com/photo-1557205465-f3762edea6d3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { _id: "19", name: "Luxury Eyeshadow Palette", price: "₹2,299", rating: 4.9, image: "https://images.unsplash.com/photo-1610290256993-a0620349007d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8THV4dXJ5JTIwRXllc2hhZG93JTIwUGFsZXR0ZSUyMHByb2R1Y3R8ZW58MHx8MHx8fDA%3D" },
      { _id: "20", name: "Vitamin C Face Wash", price: "₹899", rating: 4.6, image: "https://images.unsplash.com/photo-1614858819016-2d5e6006f29a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpdGFtaW4lMjBjJTIwZmFjZXdhc2h8ZW58MHx8MHx8fDA%3D" },
    ],
  };

  return (
    <div className="bg-green-100 min-h-screen">
      {!keyword && <Header />}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError?.data.message || isError.error}</Message>
      ) : (
        <>
          <div className="container mx-auto text-center mt-20">
            <h1 className="text-5xl font-bold text-gray-800">Explore Our Categories</h1>
            <p className="text-lg text-gray-600 mt-2">Find the best products for every need</p>
            <Link to="/shop" className="inline-block mt-6 px-8 py-3 bg-pink-600 text-white text-lg font-semibold rounded-full hover:bg-pink-700 transition">
              Shop Now
            </Link>
          </div>

          <div className="container mx-auto mt-12 space-y-12">
            {Object.entries(categories).map(([category, products]) => (
              <div key={category} className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                  {products.map((product) => (
                    <div key={product._id} className="bg-white p-6 shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105">
                      <img src={product.image} alt={product.name || "Product"} className="w-full h-40 object-cover rounded-lg" />
                      <h2 className="text-lg font-bold mt-4 text-black">{product.name || "No Name Available"}</h2>
                      <p className="text-pink-600 font-semibold text-xl">{product.price}</p>
                      <p className="text-gray-600 mt-1">⭐ {product.rating} / 5</p>
                      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
