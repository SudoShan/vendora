import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./product-card";
import { fetchProductsbyFilter } from "../../store/product-slice";

const ProductCategoryDisp = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();

  // Parse filters from search params
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  const selectedCategories = categoryParam ? categoryParam.split(",") : [];
  const selectedBrands = brandParam ? brandParam.split(",") : [];
  const minPrice = minPriceParam ? parseInt(minPriceParam) : undefined;
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam) : undefined;

  // Filter products based on search params
  const filteredProducts = products.filter((prod) => {
    const inCategory =
      selectedCategories.length === 0 || selectedCategories.includes(prod.category);
    const inBrand =
      selectedBrands.length === 0 || selectedBrands.includes(prod.brand);
    const inMin = minPrice === undefined || prod.price >= minPrice;
    const inMax = maxPrice === undefined || prod.price <= maxPrice;
    return inCategory && inBrand && inMin && inMax;
  });

  // Categorize filtered products
  const categorized = {};
  for (const prod of filteredProducts) {
    if (!categorized[prod.category]) {
      categorized[prod.category] = { products: [] };
    }
    categorized[prod.category].products.push(prod);
  }

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ width: "100%", padding: "32px 24px" }}>
      {Object.entries(categorized).map(([cat, { products }]) => (
        <div key={cat} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, color: "#222" }}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </div>
          <hr
            style={{
              border: 0,
              borderTop: "2px solid #eee",
              marginBottom: 24,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "nowrap",
              overflowX: "auto",
              paddingBottom: 18,
            }}
          >
            {/* Only display products from the filtered products in the store */}
            {products.slice(0, 5).map((prod) => (
              <ProductCard
                key={prod._id}
                id={prod._id}
                name={prod.name}
                sellername={prod.brand}
                description={prod.description}
                image={prod.images[0]}
                price={prod.price}
                discount={prod.discount}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategoryDisp;
