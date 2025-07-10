import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { dummyProducts } from "../../components/common/product-page";

// Get unique brands (sellername) for a category
function getBrandsForCategory(products: typeof dummyProducts, category: string[] | string): string[] {
    const brands = new Set<string>();
    products.forEach((prod) => {
        if (
            !category ||
            (Array.isArray(category)
                ? category.includes(prod.category)
                : prod.category === category)
        ) {
            brands.add(prod.sellername);
        }
    });
    return Array.from(brands);
}

// Get min and max price for a category
function getMinMaxPriceForCategory(products: typeof dummyProducts, category: string[] | string): { min: number; max: number } {
    const filtered =
        !category || (Array.isArray(category) && category.length === 0)
            ? products
            : products.filter((prod) =>
                  Array.isArray(category)
                      ? category.includes(prod.category)
                      : prod.category === category
              );
    if (filtered.length === 0) return { min: 0, max: 0 };
    let min = filtered[0].price;
    let max = filtered[0].price;
    filtered.forEach((prod) => {
        if (prod.price < min) min = prod.price;
        if (prod.price > max) max = prod.price;
    });
    return { min, max };
}

// Get unique categories from products
function getAllCategories(products: typeof dummyProducts): string[] {
    const categories = new Set<string>();
    products.forEach((prod) => {
        categories.add(prod.category);
    });
    return Array.from(categories);
}

interface FilterState {
    category: string[]; // now an array
    ai_search: string;
    brand: string[];
    minPrice: number;
    maxPrice: number;
}

const SideBar: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState<FilterState>({
        category: [],
        ai_search: "",
        brand: [],
        minPrice: 0,
        maxPrice: 5000,
    });

    // Get all categories, brands, and min/max price for selected category
    const categories = getAllCategories(dummyProducts);
    // Get brands for all selected categories
    const brands = getBrandsForCategory(
        dummyProducts,
        filter.category.length ? filter.category : ""
    );
    // Get min/max price for all selected categories
    const { min, max } = getMinMaxPriceForCategory(
        dummyProducts,
        filter.category.length ? filter.category : ""
    );

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilter({
            category: typeof params.category === "string" && params.category
                ? params.category.split(",")
                : [],
            ai_search: typeof params.ai_search === "string" ? params.ai_search : "",
            brand: typeof params.brand === "string" ? params.brand.split(",") : [],
            minPrice: typeof params.minPrice === "string" ? parseInt(params.minPrice) : min,
            maxPrice: typeof params.maxPrice === "string" ? parseInt(params.maxPrice) : max,
        });
    }, [searchParams, min, max]);

    // Handlers
    const handleCategoryChange = (cat: string) => {
        const newCategories = filter.category.includes(cat)
            ? filter.category.filter((c) => c !== cat)
            : [...filter.category, cat];
        setFilter((prev) => ({
            ...prev,
            category: newCategories,
            brand: [], // reset brands on category change
            minPrice: min,
            maxPrice: max,
        }));
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

    const handleAiSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({ ...prev, ai_search: e.target.value }));
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("ai_search", e.target.value);
            return params;
        });
    };

    const handleBrandChange = (brand: string) => {
        const newBrands = filter.brand.includes(brand)
            ? filter.brand.filter((b) => b !== brand)
            : [...filter.brand, brand];
        setFilter((prev) => ({ ...prev, brand: newBrands }));
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            if (newBrands.length) {
                params.set("brand", newBrands.join(","));
            } else {
                params.delete("brand");
            }
            return params;
        });
    };

    const handleMinPriceChange = (value: number) => {
        setFilter((prev) => ({
            ...prev,
            minPrice: value,
            maxPrice: Math.max(value, prev.maxPrice),
        }));
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("minPrice", value.toString());
            params.set("maxPrice", Math.max(value, filter.maxPrice).toString());
            return params;
        });
    };

    const handleMaxPriceChange = (value: number) => {
        setFilter((prev) => ({
            ...prev,
            maxPrice: value,
            minPrice: Math.min(value, prev.minPrice),
        }));
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("maxPrice", value.toString());
            params.set("minPrice", Math.min(value, filter.minPrice).toString());
            return params;
        });
    };

    return (
        <div style={{ padding: 24, width: "100%", boxSizing: "border-box" }}>
            {/* Categories */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>Category</div>
                {categories.map((cat) => (
                    <label key={cat} style={{ display: "flex", alignItems: "center", marginBottom: 6, cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={filter.category.includes(cat)}
                            onChange={() => handleCategoryChange(cat)}
                            style={{ marginRight: 8 }}
                        />
                        <span style={{ fontSize: 14 }}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                    </label>
                ))}
            </div>
            {/* AI Search */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>AI Search</div>
                <input
                    type="text"
                    value={filter.ai_search}
                    onChange={handleAiSearchChange}
                    placeholder="Describe what you want..."
                    style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                        fontSize: 14,
                        outline: "none",
                    }}
                />
            </div>
            {/* Brands */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>Brands</div>
                {brands.length === 0 && <div style={{ fontSize: 13, color: "#aaa" }}>No brands available</div>}
                {brands.map((brand) => (
                    <label key={brand} style={{ display: "flex", alignItems: "center", marginBottom: 6, cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={filter.brand.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                            style={{ marginRight: 8 }}
                        />
                        <span style={{ fontSize: 14 }}>{brand}</span>
                    </label>
                ))}
            </div>
            {/* Price Inputs */}
            <div>
                <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>Price</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                        type="number"
                        min={min}
                        max={filter.maxPrice}
                        value={filter.minPrice}
                        onChange={(e) =>
                            handleMinPriceChange(
                                Math.max(min, Math.min(Number(e.target.value), filter.maxPrice))
                            )
                        }
                        style={{
                            width: 70,
                            padding: "6px 8px",
                            borderRadius: 6,
                            border: "1px solid #ddd",
                            fontSize: 14,
                        }}
                    />
                    <span style={{ fontSize: 13 }}>to</span>
                    <input
                        type="number"
                        min={filter.minPrice}
                        max={max}
                        value={filter.maxPrice}
                        onChange={(e) =>
                            handleMaxPriceChange(
                                Math.min(max, Math.max(Number(e.target.value), filter.minPrice))
                            )
                        }
                        style={{
                            width: 70,
                            padding: "6px 8px",
                            borderRadius: 6,
                            border: "1px solid #ddd",
                            fontSize: 14,
                        }}
                    />
                </div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                    Range: ₹{min} - ₹{max}
                </div>
            </div>
        </div>
    );
};

export default SideBar;