import { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // تحميل wishlist من localStorage عند بداية التطبيق
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  // Toggle: لو الفيلم موجود نحذفه، لو مش موجود نضيفه
  const toggleWishlist = (movie) => {
    setWishlist((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      let updated;
      if (exists) {
        updated = prev.filter((m) => m.id !== movie.id);
      } else {
        updated = [...prev, movie]; // نحفظ الفيلم كامل كما هو من API
      }
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook للاستخدام
export const useWishlist = () => useContext(WishlistContext);
