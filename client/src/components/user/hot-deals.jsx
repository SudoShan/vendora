import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../common/product-card";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const hotDeals = [
  {
    _id: "hd1",
    name: "Wireless Earbuds",
    price: 2999,
    discount: 35,
    description: "High quality sound with noise cancellation.",
    sellername: "SoundPro",
    image: "https://picsum.photos/500/500?random=1",
  },
  {
    _id: "hd2",
    name: "Smart Fitness Band",
    price: 1499,
    discount: 40,
    description: "Track your fitness and health metrics.",
    sellername: "FitLife",
    image: "https://picsum.photos/500/500?random=12",
  },
  {
    _id: "hd3",
    name: "Classic Sneakers",
    price: 2499,
    discount: 30,
    description: "Comfortable and stylish everyday sneakers.",
    sellername: "ShoeMart",
    image: "https://picsum.photos/500/500?random=10",
  },
  {
    _id: "hd4",
    name: "Bluetooth Speaker",
    price: 1999,
    discount: 45,
    description: "Portable speaker with deep bass.",
    sellername: "MusicWorld",
    image: "https://picsum.photos/500/500?random=2",
  },
  {
    _id: "hd5",
    name: "Cotton T-Shirt",
    price: 499,
    discount: 50,
    description: "Soft cotton t-shirt in multiple colors.",
    sellername: "WearWell",
    image: "https://picsum.photos/500/500?random=17",
  },
  {
    _id: "hd6",
    name: "Ceramic Coffee Mug",
    price: 299,
    discount: 25,
    description: "Elegant mug for your daily coffee.",
    sellername: "HomeEssence",
    image: "https://picsum.photos/500/500?random=6",
  },
  {
    _id: "hd7",
    name: "Laptop Backpack",
    price: 1599,
    discount: 38,
    description: "Spacious and durable backpack for laptops.",
    sellername: "BagZone",
    image: "https://picsum.photos/500/500?random=5",
  },
  {
    _id: "hd8",
    name: "Analog Wrist Watch",
    price: 1299,
    discount: 42,
    description: "Classic design with leather strap.",
    sellername: "TimeKeepers",
    image: "https://picsum.photos/500/500?random=4",
  },
];

const SCROLL_AMOUNT = 260;

const HotDealsScroll = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollBy = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100vw",
        overflow: "hidden",
        padding: "32px 0",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "2rem",
          color: "#c93939c8",
          marginBottom: "18px",
          textAlign: "center",
        }}
      >
        Hot Deals for you at Vendora
      </h2>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Left Button */}
        <button
          onClick={() => scrollBy(-SCROLL_AMOUNT)}
          disabled={!canScrollLeft}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "white",
            border: "1px solid #eee",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            width: 40,
            height: 40,
            color: canScrollLeft ? "#c93939c8" : "#ccc",
            cursor: canScrollLeft ? "pointer" : "not-allowed",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          aria-label="Scroll left"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            display: "flex",
            gap: 24,
            padding: "8px 56px",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            background: "transparent",
            width: "100%",
            boxSizing: "border-box",
          }}
          className="hot-deals-scrollbar-hide"
        >
          {/* Hide scrollbar for Chrome, Safari, Opera */}
          <style>
            {`
              .hot-deals-scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {hotDeals.map((deal) => (
            <div key={deal._id} style={{ display: "inline-block" }}>
              <ProductCard
                id={deal._id}
                name={deal.name}
                sellername={deal.sellername}
                description={deal.description}
                image={deal.image}
                price={deal.price}
                discount={deal.discount}
              />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scrollBy(SCROLL_AMOUNT)}
          disabled={!canScrollRight}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "white",
            border: "1px solid #eee",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            width: 40,
            height: 40,
            color: canScrollRight ? "#c93939c8" : "#ccc",
            cursor: canScrollRight ? "pointer" : "not-allowed",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          aria-label="Scroll right"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default HotDealsScroll;
