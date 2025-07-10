// Dummy data for hot deals
import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../common/product-card";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface HotDeal {
  _id: string;
  name: string;
  price: number;
  discount: number; // in percentage
  description: string;
  sellername: string;
  image: string;
}

export const hotDeals: HotDeal[] = [
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
    image: "https://picsum.photos/500/500?random=12"
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

const SCROLL_AMOUNT = 260; // px, should be a bit more than card width

const HotDealsScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", padding: "32px 0" }}>
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
          background: "#fff",
          border: "none",
          borderRadius: "50%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          width: 40,
          height: 40,
          fontSize: 22,
          color: canScrollLeft ? "#c93939c8" : "#ccc",
          cursor: canScrollLeft ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.95,
        }}
        aria-label="Scroll left"
      >
        <FiChevronLeft size={24} />
      </button>
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
          background: "#fff",
          border: "none",
          borderRadius: "50%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          width: 40,
          height: 40,
          fontSize: 22,
          color: canScrollRight ? "#c93939c8" : "#ccc",
          cursor: canScrollRight ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.95,
        }}
        aria-label="Scroll right"
      >
        <FiChevronRight size={24} />
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
          padding: "8px 48px",
          scrollBehavior: "smooth",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        // Hide scrollbar for Chrome, Safari, Opera
        className="hot-deals-scrollbar-hide"
      >
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
    </div>
  );
};

export default HotDealsScroll;
