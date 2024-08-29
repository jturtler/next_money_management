/** Lists all expenses with details such as amount, start date, and end date. */
"use client";

import { useState } from "react"
import ExpenseItem from "./ExpenseItem"
import { JSONObject } from "@/lib/definations";
import * as Constant from "@/lib/constants";
import { useExpense } from "@/contexts/ExpenseContext";
import * as Utils from "@/lib/utils";
import FilterNavigation from "./FilterNavigation";
import DailyExpense from "./charts/DailyExpense";
import DistributionByCatergories from "./charts/DistributionByCatergories";
import MontlyExpenseTrend from "./charts/MonthlyExpenseTrends";
import ExpensesOverTimeByCategory from "./charts/ExpensesOverTimeByCategory";
import { Top5ExpenseCategories } from "./charts/Top5ExpenseCategories";
import DataList from "./charts/DataList";

export default function ExpenseList() {

	const { expenseList } = useExpense();

	const [categoriesFilter, setCategoriesFilter] = useState([""]);
	const [startDate, setStartDate] = useState<Date | null>(Utils.getStartDateOfCurrentDate());
	const [endDate, setEndDate] = useState<Date | null>(new Date());
	const [dataVisualization, setDataVisualization] = useState<string>(Constant.DATA_VISUALIZATION_DATA_LIST);

	const filterExpenseList = () => {
		let filteredList = expenseList?.filter((item) => {

			if (categoriesFilter.length == 0 || ( categoriesFilter.indexOf("" ) < 0 && categoriesFilter.indexOf(item.categoryId) < 0)) {
				return false;
			}
			if (startDate != null && item.date < Utils.formatDateObjToDbDate(startDate)) {
				return false;
			}
			if (endDate != null && item.date > Utils.formatDateObjToDbDate(endDate)) {
				return false;
			}

			return true;
		});

		return filteredList === undefined ? [] : Utils.sortArrayByDate(filteredList);
	}

	const filteredList = filterExpenseList();

	return (
		<div className="w-full flex flex-col">
			<FilterNavigation 
				onSelectCategory={(ids: string[]) => setCategoriesFilter(ids)}
				onSeleteDataVisualization={(name: string) => setDataVisualization(name)}
				onSeleteStartDate={(date: Date | null) => setStartDate( date )}
				onSelectEndDate={(date: Date | null) => setEndDate( date )}
			/>

			{filteredList.length == 0 && <div className="p-5 text-red-500 italic text-lg">* No data found</div>}
			
			{filteredList.length > 0 && dataVisualization === Constant.DATA_VISUALIZATION_DATA_LIST &&
				<div className="m-5">
					<DataList data={filteredList} />
				</div>}
			

			{filteredList.length > 0 && dataVisualization === Constant.DATA_VISUALIZATION_DAILY_EXPENSE && 
				<div className="m-5">
					<DailyExpense data={filteredList} startDate={startDate!}/>
				</div>}

			{filteredList.length > 0 && dataVisualization === Constant.DATA_VISUALIZATION_DISTRIBUTION_BY_CATEGORY && 
				<div className="mb-5">
					<DistributionByCatergories data={filteredList} />
				</div>}

			{filteredList.length > 0 && dataVisualization === Constant.DATA_VISUALIZATION_MONTHLY_EXPENSE_TRENDS && 
				<div className="mb-5">
					<MontlyExpenseTrend data={filteredList} />
				</div>}

			{filteredList.length > 0 && dataVisualization === Constant.DATA_VISUALIZATION_EXPENSE_OVERTIME_BY_CATEGORY && 
				<div className="mb-5">
					<ExpensesOverTimeByCategory data={filteredList} />
				</div>}
				
			{filteredList.length > 0 && dataVisualization === Constant.DATA_VISUALIZATION_TOP_5_EXPENSE_CATEGORY && 
				<div className="mb-5">
					<Top5ExpenseCategories data={filteredList} />
				</div>}
		</div>
	)
}

