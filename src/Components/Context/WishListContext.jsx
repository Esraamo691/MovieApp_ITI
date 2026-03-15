import { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

<<<<<<< HEAD
=======
  // تحميل wishlist من localStorage عند بداية التطبيق
>>>>>>> origin/eman
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

<<<<<<< HEAD
=======
  // Toggle: لو الفيلم موجود نحذفه، لو مش موجود نضيفه
>>>>>>> origin/eman
  const toggleWishlist = (movie) => {
    setWishlist((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      let updated;
      if (exists) {
        updated = prev.filter((m) => m.id !== movie.id);
      } else {
<<<<<<< HEAD
        updated = [...prev, movie];
=======
        updated = [...prev, movie]; // نحفظ الفيلم كامل كما هو من API
>>>>>>> origin/eman
      }
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

<<<<<<< HEAD
  

=======
>>>>>>> origin/eman
  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

<<<<<<< HEAD
=======
// Hook للاستخدام
>>>>>>> origin/eman
export const useWishlist = () => useContext(WishlistContext);
