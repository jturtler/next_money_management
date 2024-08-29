
// 2. Monthly Expense Trends (Line Chart)
// Purpose: Displays expenses over time, typically on a monthly basis.
// Use Case: Helps users track changes in their spending over time, identify trends, and plan future budgets.

import { useCategory } from "@/contexts/CategoryContext";
import { JSONObject } from "@/lib/definations";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer, LabelList } from "recharts";
import * as Utils from "@/lib/utils";
import CategoryLegend from "./CategoryLegend";
import { format, parseISO } from 'date-fns';


// Custom render function for labels
const renderCustomLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text 
        x={x + width / 2} 
        y={y - 10} 
        fill="#f44566" // Set your desired color
        textAnchor="middle" 
        dominantBaseline="bottom"
        fontSize="12px" // Set your desired font size
        fontWeight="bold" // Set font weight
      >
        {value}
      </text>
    );
  };

export default function MontlyExpenseTrend({ data }: { data: JSONObject[] }) {

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

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-5 mt-3 gap-x-3 mb-4 items-center">
            {/* Pie Chart Container - Place in the first column */}
            <div className="flex justify-end items-center col-span-2">
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={transformedData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis />
                            <Tooltip />

                            {categoryList!.map((category: JSONObject, idx: number) => {
                                return (
                                    <Bar
                                        key={`key_${idx}`}
                                        dataKey={category.name}
                                        stackId="a"
                                        fill={category.color}
                                    >
                                        {/* <LabelList
                                        content={renderCustomLabel}
                                            dataKey={(entry: JSONObject) => {
                                                console.log(entry);
                                                // Check if this is the last category with data
                                                const isLastWithData = transformedData.some(dataPoint => {
                                                    // Filter out categories with no data
                                                    const lastCategoryWithData = categoryList!.reverse().find(cat => dataPoint[cat.name]);
                                                    return lastCategoryWithData?.name === category.name;
                                                });
                                                return isLastWithData ? entry.total : null;
                                            }}
                                            position="top"
                                        /> */}
                                    </Bar>
                                );
                            })}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category List - Place in the second column */}
            <div className="flex flex-col items-start justify-between w-64">
                <CategoryLegend />
            </div>
        </div>
    );
}
