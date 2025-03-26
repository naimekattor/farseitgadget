"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/component/Header";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([1]);
  const [sortOrder, setSortOrder] = useState("");

  // Fetch Products by Default Category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://testingbackend.farseit.com/Product/searchByCategory/1`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://testingbackend.farseit.com/Category/search"
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Sort Products
  const handleSortChange = (order) => {
    setSortOrder(order);
    let sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) =>
      order === "lowToHigh" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
  };

  // Handle Category Filter Change
  const handleCategoryChange = async (categoryId, checked) => {
    const updatedCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 0) {
      setFilteredProducts(products);
      return;
    }

    try {
      const fetchPromises = updatedCategories.map((id) =>
        fetch(
          `https://testingbackend.farseit.com/Product/searchByCategory/${id}`
        ).then(async (res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const text = await res.text();
          return text ? JSON.parse(text) : [];
        })
      );
      const results = await Promise.all(fetchPromises);
      setFilteredProducts(results.flat());
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <section>
      <Header />
      <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 p-4 bg-gray-100 border rounded-md shadow-md h-auto md:h-screen overflow-auto">
          <h3 className="text-lg font-semibold mb-4">Sort by</h3>
          <div className="mb-6 space-y-2">
            {["lowToHigh", "highToLow"].map((order) => (
              <label key={order} className="block text-sm">
                <input
                  type="radio"
                  name="sort"
                  value={order}
                  checked={sortOrder === order}
                  onChange={() => handleSortChange(order)}
                  className="mr-2"
                />
                {order === "lowToHigh"
                  ? "Price - Low to High"
                  : "Price - High to Low"}
              </label>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map(({ Id, name }) => (
              <label key={Id} className="block text-sm">
                <input
                  type="checkbox"
                  name="category"
                  value={name}
                  checked={selectedCategories.includes(Id)}
                  onChange={(e) => handleCategoryChange(Id, e.target.checked)}
                  className="mr-2"
                />
                {name}
              </label>
            ))}
          </div>
        </aside>

        {/* Product List */}
        <main className="flex-1 p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Search Results: {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </h3>

          {loading ? (
            <p className="text-center text-gray-600">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="border bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {product.offer && (
                    <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded-br-md">
                      {product.offer}% OFF
                    </div>
                  )}

                  <div className="p-4 flex justify-center items-center bg-gray-100">
                    <Image
                      src={
                        product.image[0]?.startsWith("http")
                          ? product.image[0]
                          : `https://farseit.com/Upload/ProductImage/${product.image[0]
                              .split("/")
                              .pop()}`
                      }
                      width={250}
                      height={250}
                      className="w-auto h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={product.name}
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h2 className="font-medium text-lg truncate">
                      {product.name}
                    </h2>
                    <p className="text-blue-700 text-sm font-bold mb-4">
                      {product.price} TK
                    </p>
                    <button className=" bg-blue-400 py-1 px-6 text-white rounded-md">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default CategoryPage;
