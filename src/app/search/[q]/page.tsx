
import { Card, CardContent } from "@/components/ui/card"
import SearchFilters from "./components/SearchFilter"
import { DataProvider } from "@/Provider/DataProvider/DataProvider"
import { Product } from "@/Types/Types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AddToCart from "@/components/custom/AddToCart/AddToCart"


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
    page: Number(searchParams.page || ""),
    limit: Number(searchParams.limit || 12),
    brandId: searchParams.brandId?.split(",") || [],
    categoryId: searchParams.categoryId?.split(",") || [],
    subCategoryId: searchParams.subCategoryId?.split(",") || [],
    minPrice: Number(searchParams.minPrice || 0),
    maxPrice: Number(searchParams.maxPrice || 1000000),
  }

  const query = new URLSearchParams({
    search: params.q,
    ...(Number.isFinite(filters.page) && filters.page > 0 ? { page: String(filters.page) } : {}),
    limit: String(filters.limit),
    ...(filters.brandId.length > 0 ? { brandId: filters.brandId.join(",") } : {}),
    ...(filters.categoryId.length > 0 ? { categoryId: filters.categoryId.join(",") } : {}),
    ...(filters.subCategoryId.length > 0 ? { subCategoryId: filters.subCategoryId.join(",") } : {}),
    minPrice: String(filters.minPrice),
    maxPrice: String(filters.maxPrice),
  }).toString()


  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?${query}`)
  const data = await res.json()
  const products = data.data.products || [];

  console.log(products[1]);



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

          {products.map((p: Product) => (
            <Card key={p.id} className=" h-full">
              <CardContent className="h-full flex flex-col">
                <Link
                  href=""
                  className="flex flex-col flex-grow justify-between text-center"
                >
                  <div>
                    <Image
                      src={
                        p.images[0]
                          ? `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${p.images[0].image}`
                          : "/altImage.jpg"
                      }
                      alt={p.title}
                      width={400}
                      height={160}
                      className="w-full h-72 md:h-64 rounded-md object-cover mb-3"
                    />

                    <h2 className="mt-2 font-semibold my-4">{p.title}</h2>

                    <div className="text-muted-foreground flex items-center justify-center gap-2">
                      <Image src="/taka.png" alt="Taka symbol" width={20} height={20} />
                      <p className="text-md font-bold">{p.price}</p>
                    </div>
                  </div>
                </Link>

                <div className="flex justify-between items-center mt-4">
                  <Link href={`/product/${p.id}`}>
                    <Button >VIEW</Button>
                  </Link>
                  <AddToCart variant="outline" id={p.id} />
                </div>
              </CardContent>
            </Card>

          ))}

        </div>

      </div>
    </div>
  )
}
