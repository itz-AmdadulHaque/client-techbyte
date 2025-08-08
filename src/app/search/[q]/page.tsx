
import { Card, CardContent } from "@/components/ui/card"
import SearchFilters from "./components/SearchFilter"
import { DataProvider } from "@/Provider/DataProvider/DataProvider"
import { Product } from "@/Types/Types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AddToCart from "@/components/custom/AddToCart/AddToCart"
import { fetchData } from "@/lib/fetchFunction"
import CustomPagination from "@/components/custom/Pagination/Pagination"
import ProductCard from "@/components/custom/ProductCard/ProductCard"


interface SearchPageProps {
  params: { q: string }
  searchParams: {
    brandId?: string
    categoryId?: string
    subCategoryId?: string
    minPrice?: string
    maxPrice?: string
    page?: string
    limit?: string
  }
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {




  const filters = {
    name: decodeURIComponent(params.q),
    brandId: searchParams.brandId?.split(",") || [],
    categoryId: searchParams.categoryId?.split(",") || [],
    subCategoryId: searchParams.subCategoryId?.split(",") || [],
    minPrice: Number(searchParams.minPrice || 0),
    maxPrice: Number(searchParams.maxPrice || 1000000),
  }

  const page = Number(searchParams.page || 1)
  const limit = Number(searchParams.limit || 20)

  const query = new URLSearchParams({
    search: params.q,
    ...(filters.brandId.length > 0 ? { brandId: filters.brandId.join(",") } : {}),
    ...(filters.categoryId.length > 0 ? { categoryId: filters.categoryId.join(",") } : {}),
    ...(filters.subCategoryId.length > 0 ? { subCategoryId: filters.subCategoryId.join(",") } : {}),
    minPrice: String(filters.minPrice),
    maxPrice: String(filters.maxPrice),
    ...(page > 1 ? { page: String(page) } : {}), // don't include if page is 1
    limit: String(limit), // don't include if limit is default
  }).toString()


  const data = await fetchData(`/products?${query}`)

  console.log(data.data);
  const products = data.data.products || [];




  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <DataProvider>
          <SearchFilters initialFilters={filters} />
        </DataProvider>
      </div>
      <div className="lg:col-span-3 ">

        <div className="font-bold bg-gray-200 dark:bg-gray-800 p-6 my-4 rounded-md">
          Found Products & Services
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />

          ))}




        </div>

        <CustomPagination
          currentPage={data.data.currentPage}
          totalPages={data.data.totalPages || 1}
        />


      </div>
    </div>
  )
}
