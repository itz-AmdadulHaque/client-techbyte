"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useCallback, useState } from "react"

interface CustomPaginationProps {
    currentPage: number
    totalPages: number
}

export default function CustomPagination({
    currentPage,
    totalPages,
}: CustomPaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [goTo, setGoTo] = useState("")

    // Read limit from query param, default to 20
    const limitParam = searchParams.get("limit")
    const limit = limitParam ? Number(limitParam) : 20

    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key)
            } else {
                params.set(key, value)
            }
        })

        router.push(`${pathname}?${params.toString()}`)
    }

    const goToPage = useCallback(
        (page: number) => {
            updateParams({
                page: page > 1 ? String(page) : null,
                limit: limit !== 20 ? String(limit) : null,
            })
        },
        [limit, pathname, searchParams]
    )

    const changeLimit = (value: number) => {
        updateParams({
            limit: value !== 20 ? String(value) : null,
            page: null, // reset to page 1 on limit change
        })
    }

    const handleGoToPage = () => {
        const pageNum = Number(goTo)
        if (!pageNum || pageNum < 1 || pageNum > totalPages) return
        goToPage(pageNum)
    }

    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
        Math.max(0, currentPage - 3),
        Math.min(currentPage + 2, totalPages)
    )

    return (
        <div className="mt-10 flex flex-col items-center space-y-4">
            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (currentPage > 1) goToPage(currentPage - 1)
                                }}
                            />
                        </PaginationItem>

                        {visiblePages.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        goToPage(page)
                                    }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (currentPage < totalPages) goToPage(currentPage + 1)
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}

            <div className="flex flex-wrap gap-4 items-center justify-center">
                <div className="flex items-center space-x-2">
                    <span className="text-sm">Items per page:</span>
                    <Select
                        value={String(limit)}
                        onValueChange={(val: string) => changeLimit(Number(val))}
                    >
                        <SelectTrigger className="w-[80px] h-8 text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-sm">Go to page:</span>
                    <Input
                        type="number"
                        value={goTo}
                        onChange={(e) => setGoTo(e.target.value)}
                        className="w-20 h-8 text-sm"
                        min={1}
                        max={totalPages}
                        disabled={totalPages <= 1}
                    />
                    <button
                        disabled={totalPages <= 1}
                        className="text-sm px-2 py-1 border rounded bg-muted hover:bg-accent disabled:opacity-50"
                        onClick={handleGoToPage}
                    >
                        Go
                    </button>
                </div>
            </div>
        </div>
    )
}
