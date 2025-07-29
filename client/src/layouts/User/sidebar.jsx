import { useSearchParams } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsbyFilter, setFilter, clearFilter } from "../../store/product-slice";

// Helpers
function getBrandsForCategory(products, category) {
  const brands = new Set();
  products.forEach((prod) => {
    if (
      !category ||
      (Array.isArray(category)
        ? category.includes(prod.category)
        : prod.category === category)
    ) {
      brands.add(prod.brand);
    }
  });
  return Array.from(brands);
}

function SideBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const filter = useSelector((state) => state.products.filter);

  const allCategories = useMemo(() => ["Electronics", "Wearable", "Home", "Other"], []);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    const category =
      typeof params.category === "string" && params.category
        ? params.category.split(",")
        : [];
    const brands = typeof params.brand === "string" ? params.brand.split(",") : [];
    const minPrice =
      typeof params.minPrice === "string" ? parseInt(params.minPrice) : undefined;
    const maxPrice =
      typeof params.maxPrice === "string" ? parseInt(params.maxPrice) : undefined;

    dispatch(
      setFilter({
      category,
      brands,
      minPrice: minPrice ?? 0,
      maxPrice: maxPrice ?? 10000,
    })
    );
    dispatch(fetchProductsbyFilter());

  }, [searchParams, dispatch]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(clearFilter());
    }
  }, [dispatch, products.length]);


  const handleCategoryChange = (cat) => {
    const newCategories = filter.category.includes(cat)
      ? filter.category.filter((c) => c !== cat)
      : [...filter.category, cat];

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (newCategories.length) {
        params.set("category", newCategories.join(","));
      } else {
        params.delete("category");
      }
      params.delete("brand");
      params.delete("minPrice");
      params.delete("maxPrice");
      return params;
    });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filter.brands.includes(brand)
      ? filter.brands.filter((b) => b !== brand)
      : [...filter.brands, brand];

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (newBrands.length) {
        params.set("brand", newBrands.join(","));
      } else {
        params.delete("brand");
      }
      // Do NOT delete other params here!
      return params;
    });
  };

  const handleMinPriceChange = (value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("minPrice", value.toString());
      // Do not update maxPrice here
      return params;
    });
  };

  const handleMaxPriceChange = (value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("maxPrice", value.toString());
      // Do not update minPrice here
      return params;
    });
  };

  const brands = useMemo(() => {
    return getBrandsForCategory(products, filter.category.length ? filter.category : allCategories);
  }, [products, filter.category, allCategories]);

  const priceRange = useMemo(() => {
    const filteredProducts = filter.category.length
      ? products.filter((prod) => filter.category.includes(prod.category))
      : products;
    const prices = filteredProducts.map((prod) => prod.price);
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;
    return { min, max };
  }, [products, filter.category]);

  return (
    <div style={{ padding: 24, width: "100%", boxSizing: "border-box", overflowX: "hidden" }}>
      {/* Category */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15, color: "#222" }}>Category</div>
        {allCategories.map((cat) => (
          <label key={cat} style={{ display: "flex", alignItems: "center", marginBottom: 6, cursor: "pointer", color: "#222" }}>
            <input
              type="checkbox"
              checked={filter.category.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              style={{
                marginRight: 8,
                accentColor: filter.category.includes(cat) ? "#ff9800" : "#fff",
                background: "#fff",
                border: "1px solid #ccc",
                width: 16,
                height: 16,
                borderRadius: 4,
                cursor: "pointer",
              }}
            />
            <span style={{ fontSize: 14, color: "#222" }}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
          </label>
        ))}
      </div>

      {/* AI Search */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15, color: "#222" }}>AI Search</div>
        <input
          type="text"
          value={"Dummy"}
          onChange={() => {}}
          placeholder="Describe what you want..."
          style={{
            width: "85%",
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 14,
            outline: "none",
            background: "transparent",
            color: "#000",
            marginBottom: 4,
          }}
        />
      </div>

      {/* Brands */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15, color: "#222" }}>Brands</div>
        {brands.length === 0 && <div style={{ fontSize: 13, color: "#aaa" }}>No brands available</div>}
        {brands.map((brand) => (
          <label key={brand} style={{ display: "flex", alignItems: "center", marginBottom: 6, cursor: "pointer", color: "#222" }}>
            <input
              type="checkbox"
              checked={filter.brands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              style={{
                marginRight: 8,
                accentColor: filter.brands.includes(brand) ? "#ff9800" : "#fff",
                background: "#fff",
                border: "1px solid #ccc",
                width: 16,
                height: 16,
                borderRadius: 4,
                cursor: "pointer",
              }}
            />
            <span style={{ fontSize: 14, color: "#222" }}>{brand}</span>
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15, color: "#222" }}>Price</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <input
            type="number"
            min={priceRange.min}
            max={priceRange.max}
            value={filter.minPrice}
            onChange={(e) => handleMinPriceChange(Math.max(priceRange.min, Math.min(Number(e.target.value))))}
            style={{
              width: 60,
              padding: "6px 6px",
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 14,
              background: "transparent",
              color: "#000",
              marginRight: 4,
            }}
            placeholder="Min"
          />
          <span style={{ fontSize: 13, color: "#888" }}>to</span>
          <input
            type="number"
            min={filter.minPrice}
            max={priceRange.max}
            value={filter.maxPrice}
            onChange={(e) => handleMaxPriceChange(Math.min(priceRange.max, Math.max(Number(e.target.value))))}
            style={{
              width: 60,
              padding: "6px 6px",
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 14,
              background: "transparent",
              color: "#000",
              marginLeft: 4,
            }}
            placeholder="Max"
          />
        </div>
        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
          Range: ₹{priceRange.min} - ₹{priceRange.max}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
