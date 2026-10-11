"use client"

import { useEffect, useState } from "react"
import { SlidersHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types/product"
import axios from "axios"
import toast from "react-hot-toast"
import { useCart } from "@/context/CartContext"
import ProductCard from "./productCard"

function FiltersSidebar({ filterData, filters, addCategory, removeCategory, addSubCategory, removeSubCategory, updatePriceRange, applyFilters }: any) {
  const [price, setPrice] = useState([filterData.priceRange.minPrice, filterData.priceRange.maxPrice])

  useEffect(() => {
    updatePriceRange(price);
  }, [price])

  return (
    <aside className="w-full space-y-8 rounded-lg border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold">
          Filters
        </h2>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          Reset
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-4 font-medium">
          Categories
        </h3>

        <div className="space-y-4">
          {filterData.categories.map((category: any) => (
            <div
              key={category._id}
              className="flex items-center space-x-3"
            >
              <Checkbox id={category._id} checked={filters.categories.includes(category._id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addCategory(category._id);
                  } else {
                    removeCategory(category._id);
                  }
                }}
              />

              <label
                htmlFor={category._id}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sub Category */}
      <div>
        <h3 className="mb-4 font-medium">
          Sub Categories
        </h3>

        <div className="space-y-4">
          {filterData.subCategories.map((subCategory: any) => (
            <div
              key={subCategory._id}
              className="flex items-center space-x-3"
            >
              <Checkbox id={subCategory._id} checked={filters.subCategories.includes(subCategory._id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addSubCategory(subCategory._id);
                  } else {
                    removeSubCategory(subCategory._id);
                  }
                }} />

              <label
                htmlFor={subCategory._id}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {subCategory.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-medium">
            Price Range
          </h3>

          <span className="text-sm text-muted-foreground">
            ₹{price[0]} - ₹{price[1]}
          </span>
        </div>

        <Slider
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={setPrice}
          max={filterData.priceRange.maxPrice}
          min={filterData.priceRange.minPrice}
          step={10}
        />
      </div>

      <Button className="w-full rounded-2xl" onClick={applyFilters}>
        Apply Filters
      </Button>
    </aside>
  )
}


export default function ProductsList({
  productsData,
  totalPagesInitial,
  totalProductsParentInitial }: {
    productsData: Product[];
    totalPagesInitial: number;
    totalProductsParentInitial: number;
  }) {

  const [products, setProducts] = useState<Product[]>(productsData);
  const [filters, setFilters] = useState<{
    categories: string[],
    subCategories: string[],
    minPrice: number,
    maxPrice: number,
  }>({
    categories: [],
    subCategories: [],
    minPrice: -1,
    maxPrice: -1,
  });
  const [sort, setSort] = useState("newest");
  const [filterData, setFilterData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(totalPagesInitial);
  const [totalProducts, setTotalProducts] = useState(totalProductsParentInitial);

  const getFilterData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/public/products/filters`);
      if (response.data.success) {
        setFilterData(response.data.filters);
        setFilters({ ...filters, maxPrice: response.data.filters.priceRange.maxPrice });
      }
    } catch (err) {
      console.log(err);
      let errorMessage = "Something went wrong. Please try again.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    }
  }

  const getProducts = async () => {
    try {
      const params: any = {};

      if (filters.categories.length > 0) {
        params.category = filters.categories.join(",");
      }

      if (filters.subCategories.length > 0) {
        params.subCategory = filters.subCategories.join(",");
      }

      if (filters.minPrice !== -1) {
        params.minPrice = filters.minPrice;
      }

      if (filters.maxPrice !== -1) {
        params.maxPrice = filters.maxPrice;
      }

      if (sort.length > 0) {
        params.sort = sort;
      }

      let headers = {};
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        headers = {
          'Authorization': 'Bearer ' +access_token
        }
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/public/products`, {
        params, headers
      });
      if (response.data.success) {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setTotalProducts(response.data.totalProducts);
      }
    } catch (err) {
      console.log(err);
      let errorMessage = "Something went wrong. Please try again.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    }
  }

  const addCategory = (categoryId: string) => {
    console.log("filters ", { ...filters, categories: [...filters.categories, categoryId] })
    setFilters({ ...filters, categories: [...filters.categories, categoryId] })
  }

  const removeCategory = (categoryId: string) => {
    setFilters({ ...filters, categories: filters.categories.filter((cat) => cat !== categoryId) });
  }

  const addSubCategory = (subCategoryId: string) => {
    console.log("filters ", { ...filters, subCategories: [...filters.subCategories, subCategoryId] })
    setFilters({ ...filters, subCategories: [...filters.subCategories, subCategoryId] })
  }

  const removeSubCategory = (subCategoryId: string) => {
    setFilters({ ...filters, subCategories: filters.subCategories.filter((cat) => cat !== subCategoryId) });
  }

  const updatePriceRange = (prices: [number, number]) => {
    setFilters({ ...filters, minPrice: prices[0], maxPrice: prices[1] });
  }

  useEffect(() => {
    getFilterData()
  }, [])

  useEffect(() => {
    getProducts()
  }, [sort])


  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-10 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">
              Premium Electronics
            </p>

            <h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">
              Shop Collection
            </h1>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Explore premium earbuds, speakers, AI buds, and
              soundbars designed for immersive audio experiences.
            </p>
          </div>

          {/* Mobile Filter */}
          {filterData ? <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-2xl md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[320px] overflow-y-auto"
            >
              <div className="mt-8">
                <FiltersSidebar filterData={filterData} filters={filters} addCategory={addCategory} removeCategory={removeCategory} addSubCategory={addSubCategory} removeSubCategory={removeSubCategory} updatePriceRange={updatePriceRange} applyFilters={getProducts} />
              </div>
            </SheetContent>
          </Sheet> : <Sheet></Sheet>}
        </div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          {filterData ? <div className="hidden lg:block">
            <FiltersSidebar filterData={filterData} filters={filters} addCategory={addCategory} removeCategory={removeCategory} addSubCategory={addSubCategory} removeSubCategory={removeSubCategory} updatePriceRange={updatePriceRange} applyFilters={getProducts} />
          </div> : <div></div>}

          {/* Products */}
          <div>
            {/* Top Bar */}
            <div className="mb-6 flex items-center justify-between rounded-lg border bg-card px-5 py-4">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {totalProducts}
                </span>{" "}
                products
              </p>

              <select className="rounded-xl border bg-background px-4 py-2 text-sm outline-none" onChange={(e) => {
                setSort(e.target.value);
              }} >
                <option value={"newest"}>Newest First</option>
                <option value={"oldest"}>Oldest First</option>
                <option value={"price_asc"} >Price: Low to High</option>
                <option value={"price_desc"}>Price: High to Low</option>
                {/* <option>Top Rated</option> */}
              </select>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {products?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}