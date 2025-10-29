import { useState, useEffect } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">No items added to your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="p-4 bg-white rounded shadow text-center">
              <img src={item.image} alt={item.title} className="h-40 mx-auto object-contain mb-3" />
              <p className="font-semibold">{item.title}</p>
              <p className="text-green-600 text-lg font-bold">₹{item.price}</p>
              <button
                className="mt-3 px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
