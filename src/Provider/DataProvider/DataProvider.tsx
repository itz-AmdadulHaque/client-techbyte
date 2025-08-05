"use client";

import { CategoryType } from "@/Types/Types";
import React, { createContext, useState, useEffect} from "react";

type DataType = { id: string; title: string }[];

export const DataContext = createContext<{ categories: CategoryType[] }>({ categories: [] });

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [brands, setBrands] = useState<DataType[]>([]);

    const fetchCategoriesData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/with-subs`);
        const json = await res.json();

        setCategories(json.data);
    };
    
    
    const fetchBrandsData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/with-subs`);
        const json = await res.json();
        setCategories(json.data);
    };


    useEffect(() => {
        fetchCategoriesData();
        fetchBrandsData();

    }, []);

    return (
        <DataContext.Provider value={{ categories }}>
            {children}
        </DataContext.Provider>
    );
};
