import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [user] = useState({ name: "Nilesh", avatar: "https://i.pravatar.cc/40" });

  const categories = [
    { id: "all", name: "All" },
    { id: "smartphones", name: "Mobiles" },
    { id: "laptops", name: "Laptops" },
    { id: "groceries", name: "Groceries" },
    { id: "skincare", name: "Beauty" },
  ];

  useEffect(() => {
    setError(null);
    setLoading(true);

    fetch(
      selectedCategory === "all"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => setDeals(data.products || []))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Navbar */}
      <header className="bg-blue-500 text-white flex items-center justify-between px-6 py-4 shadow-md">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold font-[Poppins] cursor-pointer hover:text-blue-200"
        >
          Refx
        </h1>

        {/* Search bar */}
        <div className="flex w-full max-w-xl mx-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="flex-1 p-2 rounded-l-md outline-none text-gray-700"
            onKeyDown={(e) =>
              e.key === "Enter" &&
              navigate(`/compare?product=${searchTerm.trim()}`)
            }
          />
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 rounded-r-md font-semibold"
            onClick={() => navigate(`/compare?product=${searchTerm.trim()}`)}
          >
            Search
          </button>
        </div>

        {/* User Profile */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 bg-white text-blue-600 px-3 py-2 rounded-full cursor-pointer hover:bg-blue-100 transition"
        >
          <img
            src={user.avatar}
            alt="User"
            className="w-8 h-8 rounded-full border border-blue-400"
          />
          <span className="font-medium">{user.name}</span>
        </div>
      </header>

      {/* 🛍️ Quick Access Section */}
      <section className="mt-8 mx-auto w-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Continue Shopping",
            desc: "Pick up where you left off",
            img: "https://images.unsplash.com/photo-1515165562835-c4c2bda7b44c?auto=format&fit=crop&w=1000&q=80", // shopping bag on table
          },
          {
            title: "Wishlist",
            desc: "Your saved favorites",
            img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80", // heart on gift box
          },
          {
            title: "Recently Viewed",
            desc: "Check your browsing history",
            img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80", // person viewing laptop
          },
          {
            title: "Top Picks for You",
            desc: "Based on your interests",
            img: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?auto=format&fit=crop&w=1000&q=80", // modern tech products
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer group"
            onClick={() => console.log(`${card.title} clicked`)}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
              <h3 className="text-white text-lg font-semibold">
                {card.title}
              </h3>
              <p className="text-gray-200 text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="mt-10 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Shop by Category
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-6 py-2 rounded-full border font-medium transition ${
                selectedCategory === cat.id
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-blue-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Recommended Section */}
      <section className="mt-8 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recommended for You
        </h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deals.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 cursor-pointer"
              onClick={() => navigate(`/compare?product=${item.title}`)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-48 w-full object-contain mb-3 rounded"
              />
              <h3 className="font-semibold text-gray-800 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-1">{item.brand}</p>
              <p className="font-bold text-blue-600">
                ₹{(item.price * 83).toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">
                ⭐ {item.rating} • {item.category}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-blue-600 text-white py-6 text-center">
        <p>© 2025 Refx. Built with ❤️ for a smarter shopping experience.</p>
      </footer>
    </div>
  );
}
