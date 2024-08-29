
'use client'

import { useCategory } from "@/contexts/CategoryContext";

export default function CategoryLegend() {
    
	const { categoryList } = useCategory();

    return (
        <>
        {categoryList!.map((category, idx) => (
            <div className="flex flex-row m-1 items-center justify-between" key={category._id}>
                <div style={{ backgroundColor:category.color }} className="w-4 h-4 rounded-full"></div>
                <div className="px-3 text-right whitespace-nowrap">{category.name}</div>
            </div>
        ))}
        </>
    )
}