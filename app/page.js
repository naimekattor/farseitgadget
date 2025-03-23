"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const defaultCategoryId = 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://testingbackend.farseit.com/Product/searchByCategory/${defaultCategoryId}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
        setSelectedCategories([defaultCategoryId]);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          "https://testingbackend.farseit.com/Category/search"
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCategory(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const handleSortChange = (order) => {
    setSortOrder(order);

    let sortedProducts = [...filteredProducts];

    if (order === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  const handleCategoryChange = async (categoryId, checked) => {
    let updatedCategories;

    if (checked) {
      updatedCategories = [...selectedCategories, categoryId];
    } else {
      updatedCategories = selectedCategories.filter((id) => id !== categoryId);
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 0) {
      setFilteredProducts(products);
      return;
    }

    try {
      const fetchPromises = updatedCategories.map((categoryId) =>
        fetch(
          `https://testingbackend.farseit.com/Product/searchByCategory/${categoryId}`
        ).then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const text = await res.text();
          return text ? JSON.parse(text) : [];
        })
      );

      const results = await Promise.all(fetchPromises);
      const mergedProducts = results.flat();
      setFilteredProducts(mergedProducts);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar for filtering */}
      <div className="w-full md:w-64 p-4 bg-gray-100 border rounded-md shadow-md overflow-y-auto h-screen">
        <h3 className="text-lg font-semibold mb-4">Sort by</h3>
        <div className="mb-6">
          <label className="block text-sm mb-2">
            <input
              type="radio"
              name="sort"
              value="lowToHigh"
              checked={sortOrder === "lowToHigh"}
              onChange={() => handleSortChange("lowToHigh")}
              className="mr-2"
            />
            Price - Low to High
          </label>
          <label className="block text-sm mb-2">
            <input
              type="radio"
              name="sort"
              value="highToLow"
              checked={sortOrder === "highToLow"}
              onChange={() => handleSortChange("highToLow")}
              className="mr-2"
            />
            Price - High to Low
          </label>
        </div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <div className="mb-6">
          {category &&
            category.map((category) => (
              <label key={category.Id} className="block text-sm mb-2">
                <input
                  type="checkbox"
                  name="category"
                  value={category.name}
                  checked={selectedCategories.includes(category.Id)}
                  onChange={(e) =>
                    handleCategoryChange(category.Id, e.target.checked)
                  }
                  className="mr-2"
                />
                {category.name}
              </label>
            ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Search Results: {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </h3>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">
            No products found within the selected price range.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="relative border flex flex-col justify-between h-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                {product.offer && (
                  <div className="absolute top-0 left-0 z-40 w-16 h-16">
                    <div className="absolute transform -rotate-45 bg-[#192a56] text-center text-white font-semibold py-1 left-[-55px] top-[20px] w-[170px] text-xs">
                      {product.offer}% OFF
                    </div>
                  </div>
                )}

                <div className="z-30">
                  <div className="bg-slate-200 h-[300px] p-4 flex justify-center items-center">
                    {console.log(product.image.map((image) => image))}
                    <Image
                      src={
                        product.image[0]?.startsWith("http")
                          ? product.image[0]
                          : `https://farseit.com/Upload/ProductImage/${product.image[0]
                              .split("/")
                              .pop()}`
                      }
                      width={300}
                      height={300}
                      className=" w-auto h-[290px]  group-hover:scale-105 transition-all duration-300"
                      alt={`product-image-${index}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                  </div>

                  <div className="p-4 space-y-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product.name}{" "}
                    </h2>
                    <div className="flex gap-2">
                      <p className="text-[#192A56] text-sm font-bold">
                        {product.price} TK
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center items-center p-4 gap-4 mt-2">
                    <button className="text-sm bg-[#192A56] hover:bg-[#16a085] text-white px-3 py-0.5 rounded-sm cursor-pointer">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
