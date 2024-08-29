// Expense Distribution by Category (Pie/Donut Chart)
// Purpose: Shows how a user’s expenses are distributed across different categories (e.g., food, rent, utilities, entertainment).
// Use Case: Helps users identify which categories consume the largest portion of their budget.

'use client'

import { JSONObject } from "@/lib/definations";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useCategory } from "@/contexts/CategoryContext";
import * as Utils from "@/lib/utils";
import CategoryLegend from "./CategoryLegend";

export default function DistributionByCatergories({ data }: { data: JSONObject[] }) {

	const { categoryList } = useCategory();
 
	const transformedData = data.reduce((acc: JSONObject[], expense: JSONObject) => {
		const { categoryId, amount } = expense;
		const category = Utils.findItemFromList(categoryList!, categoryId, "_id")!;
		const existingCategory = acc.find(item => item.categoryName === category.name);
		if (existingCategory) {
			existingCategory.total += amount;
		} else {
			acc.push({ categoryName: category.name, total: amount, color: category.color });
		}
		return acc;
	}, []) as JSONObject[];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-5 mt-3 gap-x-3 mb-4 items-center">
			{/* Pie Chart Container - Place in the first column */}
			<div className="flex justify-end items-center">
				<div className="w-full max-w-[500px]"> {/* Adjust max-width as needed */}
					<ResponsiveContainer width="100%" height={400}>
						<PieChart>
							<Pie
								data={transformedData}
								nameKey="categoryName"
								dataKey="total"
								cx={200}
								cy={200}
								label
							>
								{categoryList!.map((category, index) => (
									<Cell key={`cell-${category._id}`} fill={category.color} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
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
