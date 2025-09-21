"use client";

import { CategoryType } from "@/Types/Types";
import React, { createContext, useState, useEffect} from "react";


export const DataContext = createContext<{ categories: CategoryType[], brands: CategoryType[] }>({ categories: [], brands: [] });

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [brands, setBrands] = useState<CategoryType[]>([]);

    const fetchCategoriesData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/with-subs`);
        const json = await res.json();
        console.log(json);
        setCategories(json.data);
    };
    
    
    const fetchBrandsData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`);
        const json = await res.json();

        console.log("fetchBrandsData ",json);
        setBrands(json.data);
    };


    useEffect(() => {
        fetchCategoriesData();
        fetchBrandsData();

    }, []);

    return (
        <DataContext.Provider value={{ categories, brands }}>
            {children}
        </DataContext.Provider>
    );
};
