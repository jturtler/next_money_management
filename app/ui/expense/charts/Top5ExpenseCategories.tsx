

// Top 5 Expense Categories (Horizontal Bar Chart)
// Purpose: Highlights the top 5 categories where users spend the most.
// Use Case: Helps users quickly see which areas are driving the majority of their expenses.

'use client'

import { JSONObject } from "@/lib/definations";
import CategoryLegend from "./CategoryLegend";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useCategory } from "@/contexts/CategoryContext";
import * as Utils from "@/lib/utils";


export function Top5ExpenseCategories({ data }: { data: JSONObject[] }) {

    const { categoryList } = useCategory();

    const getTop5ExpenseCategories = (): JSONObject[] => {
        // Step 1: Group by categoryId and sum the amounts
        const categoryTotals = data.reduce((acc, item) => {
            const { categoryId, amount } = item;
            const category = Utils.findItemFromList(categoryList!, item.categoryId, "_id")!;
            acc[category.name] = (acc[category.name] || 0) + amount;
            return acc;
        }, {});

        // Step 2: Convert the object into an array of objects with categoryId and totalAmount
        const sortedCategories = Object.entries(categoryTotals).map(([categoryName, totalAmount]) => ({
            categoryName,
            totalAmount,
            fill: Utils.findItemFromList(categoryList!, categoryName, "name")!.color

        })).sort((a, b) => b.totalAmount - a.totalAmount); // Sort by totalAmount in descending order

        // Step 3: Get the top 5 categories
        return sortedCategories.slice(0, 5);
    }

    const chartData = getTop5ExpenseCategories();  
console.log(chartData);
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-5 mt-3 gap-x-3 mb-4 items-center">
        {/* Pie Chart Container - Place in the first column */}
        <div className="flex justify-end items-center col-span-2">
            <div className="w-full">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 100, bottom: 25 }}
                        layout="vertical"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number"  />
                        <YAxis type="category" 
                            dataKey="categoryName" 
                            tick={{ fontSize: 12 }}/>
                        <Tooltip />
                        <Bar dataKey={"totalAmount"} >
                            <LabelList dataKey="totalAmount" position="center" fill="#f44566" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Category List - Place in the second column */}
        <div className="flex flex-col items-start justify-between w-64">
            <CategoryLegend />
        </div>
    </div>
    )
}