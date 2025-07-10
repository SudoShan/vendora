import React from "react";
import { dummyProducts } from "./product-page";
import ProductCard from "./product-card";

// Categorize products by category and return a plain JSON object
export function getCategorizedProducts(products: typeof dummyProducts) {
  type ProductWithImageArray = Omit<typeof products[number], "image"> & { image: string[] };
  const result: Record<string, { products: ProductWithImageArray[] }> = {};
  for (const prod of products) {
    if (!result[prod.category]) {
      result[prod.category] = { products: [] };
    }
    // Ensure image is always an array for backend compatibility
    result[prod.category].products.push({
      ...prod,
      image: Array.isArray(prod.image) ? prod.image : [prod.image],
    });
  }
  return result;
}

const categoryDisplayNames: Record<string, string> = {
  electronics: "Electronics",
  wearable: "Wearables",
  home: "Home",
  other: "Other",
};

const ProductCategoryDisp: React.FC = () => {
  const categorized = getCategorizedProducts(dummyProducts);

  return (
    <div style={{ width: "100%", padding: "32px 24px" }}>
      {Object.entries(categorized).map(([cat, { products }]) => (
        <div key={cat} style={{ marginBottom: 18}}>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, color: "#222" }}>
            {categoryDisplayNames[cat] || cat}
          </div>
          <hr style={{ border: 0, borderTop: "2px solid #eee", marginBottom: 24 }} />
          <div style={{ display: "flex", gap: 24, flexWrap: "nowrap", overflowX: "auto", paddingBottom: 18 }}>
            {products.slice(0, 5).map((prod) => (
              <ProductCard
                key={prod._id}
                id={prod._id}
                name={prod.name}
                sellername={prod.sellername}
                description={prod.description}
                image={prod.image[0]}
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
