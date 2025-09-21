"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function useProductFilter() {
    const searchParams = useSearchParams();

    const initialState = {
        searchQuery: searchParams.get("search") || "",
        pageLimit: parseInt(searchParams.get("limit") || "0"),
        pageIndex: Math.max(0, parseInt(searchParams.get("page") || "1")),
        isActive: searchParams.get("isActive") || "",
        isDeleted: searchParams.get("isDeleted") || "",
        categoryId: searchParams.get("categoryId") || "",
        subCategoryId: searchParams.get("categoryId") || "",
        brandId: searchParams.get("brandId") || ""
    };

    const [search, setSearch] = useState(initialState.searchQuery);
    const [debouncedSearch, { flush }] = useDebounce(search, 700);

    const [isActive, setIsActive] = useState(initialState.isActive);
    const [isDeleted, setIsDeleted] = useState(initialState.isDeleted);
    const [page, setPage] = useState(initialState.pageIndex);
    const [limit, setLimit] = useState(initialState.pageLimit);
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');

    useEffect(() => {
        const newParams = new URLSearchParams();
        if (page - 1) newParams.set("page", page.toString());
        if (limit) newParams.set("limit", limit.toString());

        if (debouncedSearch) newParams.set("search", debouncedSearch);
        if (isActive) newParams.set("isActive", isActive);
        if (isDeleted) newParams.set("isDeleted", isDeleted);
        if (categoryId) newParams.set("categoryId", categoryId);
        if (subCategoryId) newParams.set("subCategoryId", subCategoryId);
        if (brandId) newParams.set("brandId", brandId);


        // setSearchParams(newParams, { replace: true });
    }, [page, limit, debouncedSearch, isActive, isDeleted, categoryId, subCategoryId, brandId]);

    useEffect(() => {
        if (debouncedSearch) setPage(1);
    }, [debouncedSearch]);

    const handleActiveChange = (value: string) => {
        setIsActive(value);
        setPage(1);
    };

    const handleLimitChange = (value: number) => {
        setLimit(value);
        setPage(1);
    };

    const handleDeleteChange = (value: string) => {
        setIsDeleted(value);
        setPage(1);
    };

    const handleCategoryIdChange = (value: string) => {
        setCategoryId(value);
        setPage(1)
    }
    
    
    const handleSubCategoryIdChange = (value: string) => {
        setCategoryId(value);
        setPage(1)
    }
    
    const handleBrandIdChange = (value: string) => {
        setBrandId(value);
        setPage(1)
    }

    const handleClearFilters = () => {
        // Reset all local states
        setSearch("");
        flush();    // cancel debaunce by setsearch
        setIsActive("");
        setIsDeleted("");
        setPage(1);
        setLimit(0);
        setCategoryId("")
        setSubCategoryId("");
        setBrandId("")

        // Clear all URL params
        // setSearchParams({}, { replace: true });
    };

    return {
        search,
        handleSearchChange: setSearch,
        isActive,
        handleActiveChange,
        isDeleted,
        handleDeleteChange,
        page,
        handlePageChange: setPage,
        limit,
        handleLimitChange,
        handleClearFilters,
        categoryId,
        handleCategoryIdChange,
        brandId,
        handleBrandIdChange,
        subCategoryId,
        handleSubCategoryIdChange
    };
}
