
import SearchFilters from "./components/SearchFilter"
import { Product } from "@/Types/Types"
import { fetchData } from "@/lib/fetchFunction"
import CustomPagination from "@/components/custom/Pagination/Pagination"
import ProductCard from "@/components/custom/ProductCard/ProductCard"


interface SearchPageProps {
  searchParams: Promise<{
    search?:string;
    brand?: string
    category?: string
    subCategory?: string
    minPrice?: string
    maxPrice?: string
    page?: string
    limit?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {




  const filters = {
    name: (await searchParams).search || '',
    brand: (await searchParams).brand?.split(",") || [],
    category: (await searchParams).category?.split(",") || [],
    subCategory: (await searchParams).subCategory?.split(",") || [],
    minPrice: Number((await searchParams).minPrice || null),
    maxPrice: Number((await searchParams).maxPrice || null),
  }

  const page = Number((await searchParams).page || 1)
  const limit = Number((await searchParams).limit || 20)

  const query = new URLSearchParams({
    ...(filters.name.length > 0 ? { search: filters.name } : {}),
    ...(filters.brand.length > 0 ? { brand: filters.brand.join(",") } : {}),
    ...(filters.category.length > 0 ? { category: filters.category.join(",") } : {}),
    ...(filters.subCategory.length > 0 ? { subCategory: filters.subCategory.join(",") } : {}),
    minPrice: String(filters.minPrice),
    maxPrice: String(filters.maxPrice),
    ...(page > 1 ? { page: String(page) } : {}), // don't include if page is 1
    limit: String(limit), // don't include if limit is default
  }).toString()

  console.log(query);

  const data = await fetchData(`/products?${query}`)

  console.log(data.data);
  const products = data.data.products || [];




  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        
          <SearchFilters initialFilters={filters} />
        
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
          limitOptions={[20, 30, 40]}
        />


      </div>
    </div>
  )
}
