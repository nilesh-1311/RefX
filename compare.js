import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Compare() {
  const [params] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const product = params.get("product");
  const BASE_URL = "http://localhost:5001";

  useEffect(() => {
    if (!product) return;
    setLoading(true);

    fetch(`${BASE_URL}/api/prices?product=${encodeURIComponent(product)}`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => setData({ error: "Failed to fetch" }))
      .finally(() => setLoading(false));
  }, [product]);

  if (loading) return <p className="p-6">Loading comparison...</p>;
  if (!data) return <p className="p-6">Enter a product to compare.</p>;

  // 🧠 Find the lowest online & offline prices
  const lowestOnline = data.online?.length
    ? Math.min(...data.online.map((p) => p.price))
    : null;

  const allOfflinePrices = data.offline?.flatMap((s) => s.products.map((p) => p.price)) || [];
  const lowestOffline = allOfflinePrices.length ? Math.min(...allOfflinePrices) : null;

  // ❤️ Add to wishlist handler
  const addToWishlist = (item) => {
    const current = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = current.find((p) => p.id === item.id);
    if (!exists) {
      const updated = [...current, item];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      alert(`${item.title} added to wishlist ❤️`);
    } else {
      alert(`${item.title} is already in wishlist!`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Comparison for “{product}”</h1>

      {/* Online Stores */}
      <h2 className="text-2xl font-semibold mb-2">Online Stores</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {data.online?.map((item, i) => {
          const isBest = item.price === lowestOnline;
          return (
            <div
              key={i}
              className={`p-4 bg-white rounded shadow text-center border-2 ${
                isBest ? "border-green-500" : "border-transparent"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 mx-auto object-contain mb-3"
              />
              <p className="font-semibold flex justify-center items-center gap-2">
                {item.title} {isBest && <span>✅</span>}
              </p>
              <p className="text-green-600 text-lg font-bold">₹{item.price}</p>
              <p className="text-gray-500">{item.brand}</p>
              <p className="text-sm">{item.source}</p>

              {/* ❤️ Add to Wishlist Button */}
              <button
                onClick={() => addToWishlist(item)}
                className="mt-3 px-3 py-1 bg-pink-500 text-white rounded"
              >
                ❤️ Add to Wishlist
              </button>
            </div>
          );
        })}
      </div>

      {/* Offline Stores */}
      <h2 className="text-2xl font-semibold mb-2">Offline Stores</h2>
      {data.offline?.length ? (
        <div className="space-y-4">
          {data.offline.map((store, i) => (
            <div key={i} className="p-4 bg-gray-100 rounded">
              <h3 className="font-bold text-lg">{store.storeName}</h3>
              <p className="text-gray-600">{store.location}</p>
              <ul className="mt-2">
                {store.products.map((p, j) => (
                  <li
                    key={j}
                    className="flex justify-between border-b py-1 items-center"
                  >
                    <span>
                      {p.name}{" "}
                      {p.price === lowestOffline && (
                        <span className="text-green-600 ml-1">✅</span>
                      )}
                    </span>
                    <span className="text-green-600 font-semibold">
                      ₹{p.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No offline store data found.</p>
      )}

      <p className="mt-6 text-gray-500 text-sm">
        Last checked: {data.checkedAt}
      </p>
    </div>
  );
}
