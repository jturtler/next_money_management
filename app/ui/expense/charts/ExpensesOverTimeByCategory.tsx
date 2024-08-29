// 4. Expenses Over Time by Category (Stacked Area Chart)
// Purpose: Displays how spending in different categories changes over time.
// Use Case: Allows users to see which categories are growing or shrinking and adjust their budget accordingly.

import { useCategory } from "@/contexts/CategoryContext";
import { JSONObject } from "@/lib/definations";
import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Line
} from "recharts";
import * as Utils from "@/lib/utils";
import CategoryLegend from "./CategoryLegend";
import { parseISO, format } from "date-fns";


export default function ExpensesOverTimeByCategory({ data }: { data: JSONObject[] }) {

    const { categoryList } = useCategory();

    const transformData = (): JSONObject[] => {
        const result = {};

        data.forEach((item) => {
            const date = new Date(item.date);
            const category = Utils.findItemFromList(categoryList!, item.categoryId, "_id")!;
            const monthYearStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01T00:00:00.Z`; // Extract month-year
            const monthYearObj = parseISO(monthYearStr);
            const monthYearName = format(date, 'MMM yyyy');

            // If the month-year doesn't exist in the result, initialize it
            if (!result[monthYearStr]) {
                result[monthYearStr] = { monthYearStr, time: monthYearObj, name: monthYearName };
            }

            // Accumulate totals by categoryId
            if (result[monthYearStr][category.name]) {
                result[monthYearStr][category.name] += item.amount;
            } else {
                result[monthYearStr][category.name] = item.amount;
            }
        });

        // Compute the total value for each bar
        const list = Object.values(result).map((entry: JSONObject) => {
            return {
                ...entry,
                total: categoryList!.reduce((sum, category) => sum + (entry[category.name] || 0), 0),
            };
        });

        return list.sort((a: JSONObject, b: JSONObject) => a.time.getTime() - b.time.getTime());
    }

    const transformedData = transformData();
    console.log(transformedData);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-5 mt-3 gap-x-3 mb-4 items-center">
            {/* Pie Chart Container - Place in the first column */}
            <div className="flex justify-end items-center">
                <div className="w-full max-w-[500px]"> {/* Adjust max-width as needed */}
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart
                            width={500}
                            height={400}
                            data={transformedData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 20
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name"
                                interval={0}
                                angle={-35}
                                textAnchor="end"
                                tick={{ fontSize: 12 }} 
                            />
                            <YAxis />
                            <Tooltip />
                            {categoryList!.map((category: JSONObject, idx: number)=> (
                                <Area key={`${category._id}`} type="monotone" dataKey={category.name}
                                     stackId={idx}
                                     stroke={category.color}
                                     fill={category.color}
                                     fillOpacity={0.4}
                                />
                            ))}
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category List - Place in the second column */}
            <div className="flex flex-col items-start justify-between">
                <CategoryLegend />
            </div>
        </div>
    );
}
