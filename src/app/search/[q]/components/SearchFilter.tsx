"use client"

import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { DataContext } from "@/Provider/DataProvider/DataProvider"
import { CategoryType } from "@/Types/Types"

interface Filters {
  name: string;
  brandId: string[];
  categoryId: string[];
  subCategoryId: string[];
  minPrice: number;
  maxPrice: number;
  page: number;
  limit: number;
}

export default function SearchFilters({ initialFilters }: { initialFilters: Filters }) {
  const router = useRouter()

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const { categories} = useContext(DataContext)

  // Temporary price range state
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters.minPrice,
    initialFilters.maxPrice,
  ])

  const [open, setOpen] = useState({
    brandId: true,
    categoryId: true,
    price: true,
    limit: true,
  })

  const updateField = <K extends keyof Filters>(field: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  // FOR MULTIPLE SECTION CHECKBOXES
  // const handleCheckbox = (type: "brandId" | "category" | "subcategory", value: string) => {
  //   const exists = filters[type].includes(value)
  //   updateField(
  //     type,
  //     exists ? filters[type].filter((v: string) => v !== value) : [...filters[type], value]
  //   )
  // }


  const handleCheckbox = (
    type: "brandId" | "categoryId" | "subCategoryId",
    value: string
  ) => {
    // If clicking the already selected value → clear it
    if (filters[type].includes(value)) {
      updateField(type, [])
    } else {
      // Replace with only the clicked value (single select)
      updateField(type, [value])
    }
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (filters.brandId.length) params.set("brandId", filters.brandId.join(","))
    if (filters.categoryId.length) params.set("categoryId", filters.categoryId.join(","))
    if (filters.subCategoryId.length) params.set("subCategoryId", filters.subCategoryId.join(","))
    // skip price range here
    params.set("page", String(filters.page))
    params.set("limit", String(filters.limit))

    router.push(`/search/${encodeURIComponent(filters.name)}?${params.toString()}`)
  }

  const applyPriceFilter = () => {
    const params = new URLSearchParams()
    params.set("page", String(filters.page))
    params.set("limit", String(filters.limit))
    if (filters.brandId.length) params.set("brandId", filters.brandId.join(","))
    if (filters.categoryId.length) params.set("categoryId", filters.categoryId.join(","))
    if (filters.subCategoryId.length) params.set("subCategoryId", filters.subCategoryId.join(","))
    params.set("minPrice", String(priceRange[0]))
    params.set("maxPrice", String(priceRange[1]))

    router.push(`/search/${encodeURIComponent(filters.name)}?${params.toString()}`)
  }
  
  
  const clearPriceFilter = () => {
    const params = new URLSearchParams()
    params.set("page", String(filters.page))
    params.set("limit", String(filters.limit))
    if (filters.brandId.length) params.set("brandId", filters.brandId.join(","))
    if (filters.categoryId.length) params.set("categoryId", filters.categoryId.join(","))
    if (filters.subCategoryId.length) params.set("subCategoryId", filters.subCategoryId.join(","))

    setPriceRange([0, 1000000])

    router.push(`/search/${encodeURIComponent(filters.name)}?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      name: filters.name,
      brandId: [],
      categoryId: [],
      subCategoryId: [],
      minPrice: 0,
      maxPrice: 1000000,
      page: 1,
      limit: 12,
    })
    setPriceRange([0, 1000000])
    router.push(`/search/${encodeURIComponent(filters.name)}`)
  }

  const renderCollapsible = (title: string, field: keyof typeof open, children: React.ReactNode) => (
    <Card>
      <CardContent className="">
        <Collapsible open={open[field]} onOpenChange={(val) => setOpen((prev) => ({ ...prev, [field]: val }))}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <span className="font-semibold">{title}</span>
            {open[field] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">{children}</CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-4 shadow-md p-4 rounded-lg">


      {/* price range */}
      {renderCollapsible(
        "Price Range",
        "price",
        <div className="space-y-4">
          <Slider
            min={0}
            max={1000000}
            step={10}
            value={priceRange}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
          />

          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 0])}
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-between items-center mt-2">

            <Button size="sm" onClick={applyPriceFilter}>
              Filter Range
            </Button>
            
            
            <Button size="sm" onClick={clearPriceFilter} variant="outline">
              Clear Range
            </Button>

          </div>
        </div>
      )}


      {/* brand */}
      {renderCollapsible(
        "Brand",
        "brandId",
        ["Nike", "Adidas", "Puma"].map((b) => (
          <div key={b} className="flex items-center space-x-2">
            <Checkbox
              checked={filters.brandId.includes(b)}
              onCheckedChange={() => handleCheckbox("brandId", b)}
            />
            <label>{b}</label>
          </div>
        ))
      )}

      {renderCollapsible(
        "Category",
        "categoryId",
        categories.map((c:CategoryType) => (
          <div key={c.id} className="flex items-center space-x-2">
            <Checkbox
              checked={filters.categoryId.includes(c.id)}
              onCheckedChange={() => handleCheckbox("categoryId", c.id)}
            />
            <label>{c.title}</label>
          </div>
        ))
      )}



      {renderCollapsible(
        "Items per page",
        "limit",
        <Input
          type="number"
          min={1}
          value={filters.limit}
          onChange={(e) => updateField("limit", Number(e.target.value))}
        />
      )}

      <div className="flex flex-wrap gap-3 justify-between">
        <Button onClick={applyFilters}>Apply Filter</Button>
        <Button variant="outline" onClick={clearFilters}>Clear Filter</Button>
      </div>
    </div>
  )
}
