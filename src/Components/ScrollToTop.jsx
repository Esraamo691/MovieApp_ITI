import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; 
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"; 

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false); // للتحكم في ظهور الزرار
  const [isScrolling, setIsScrolling] = useState(false); // عشان التنطيط
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {  
        setIsVisible(false); // لو فوق خالص يختفي على طول
      }

      // لما يبدأ سكروول نشغل التنطيط
      setIsScrolling(true);

      // نوقف أي تايمر قديم
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

     
      hideTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: isScrolling ? [0, -8, 0] : 0, // تنطيط لو فيه سكروول
          }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            duration: isScrolling ? 0.8 : 0.3,
            repeat: isScrolling ? Infinity : 0, // يفضل يتنطط طول ما فيه سكروول
          }}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#3fa9f5",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            boxShadow: "1px 1px 20px #14183d",
            zIndex: 1000,
          }}
        >
          <KeyboardArrowUpIcon />
        </motion.button>
      )}
    </>
  );
}
