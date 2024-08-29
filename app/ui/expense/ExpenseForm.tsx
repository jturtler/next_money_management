/** Form component for setting or updating the user's expense */

"use client";
import { JSONObject } from '@/lib/definations';
import React, { useEffect, useState } from 'react';
import * as Utils from "@/lib/utils";
import DateField from '../basics/DateField';
import Alert from '../basics/Alert';
import * as Constant from '@/lib/constants';
import { useExpense } from '@/contexts/ExpenseContext';
import { useMainUi } from '@/contexts/MainUiContext';
import { useCategory } from '@/contexts/CategoryContext';
import { IoIosArrowForward } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";


export default function ExpenseForm({ data = {} as JSONObject }) {

	const { setSubPage } = useMainUi();
	const { categoryList } = useCategory();
	const { userId, processingStatus, setProcessingStatus, error, saveExpense, newExpense } = useExpense();

	const [expense, setExpense] = useState(data);
	const [continueCreateNew, setContinueCreateNew] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		if (processingStatus === Constant.SAVE_EXPENSE_SUCCESS) {
			if (continueCreateNew) {
				handleOnReset();
			}
			else {
				setProcessingStatus("");
				setSubPage(null);
			}
		}
	}, [processingStatus]);

	const setValue = (propName: string, value: string | Date | null) => {
		setErrMsg("");
		var tempData = Utils.cloneJSONObject(expense);
		if (value == null || value == "") {
			delete tempData[propName];
		}
		else if (value instanceof Date) {
			tempData[propName] = Utils.formatDateObjToDbDate(value);
		}
		else {
			tempData[propName] = value;
		}

		setExpense(tempData);
	}

	const handleOnSave = (event: React.MouseEvent<HTMLButtonElement>, isContinue: boolean) => {
		event.preventDefault();
		if (checkValidation()) {
			expense.userId = userId;
			setContinueCreateNew(isContinue);

			saveExpense(expense);
		}
		else {
			console.log(errMsg);
			setErrMsg("Please check red fields.")
		}
	};

	const checkValidation = () => {
		return (expense.categoryId === undefined
			|| expense.amount === undefined
			|| expense.date === undefined
		) ? false : true;
	}

	const handleOnReset = () => {
		setExpense(Utils.cloneJSONObject(data));
	}

	const setTitle = () => {
		return (expense._id != undefined) ? "Edit expense" : "Add a new Expense";
	}

	return (
		<>
			<nav className="bg-dark-slate px-4 text-white py-1">
				<div className="flex items-center text-text-white ">
					<div className="flex flex-row rounded-sm hover:bg-slate-blue px-3 cursor-pointer space-x-2 items-center" onClick={() => setSubPage(null)}>
						<AiFillHome />
						<div>Home</div>
					</div>

					<div className="mx-2 flex items-center">
						<IoIosArrowForward />
					</div>

					<div className="bg-slate-blue px-3">{data._id === undefined ? "Add New Expense" : "Exit Expense"}</div>
				</div>
			</nav>


			<div className="overflow-x-auto bg-background-color">
				{processingStatus == Constant.SAVE_EXPENSE_SUCCESS && <Alert type={Constant.ALERT_TYPE_INFO} message={`Saved successfully.`} />}
				{processingStatus == Constant.SAVE_EXPENSE_FAILURE && <Alert type={Constant.ALERT_TYPE_ERROR} message={`Saving data is failed. ${error}`} />}
				{error == Constant.SAVE_EXPENSE_FAILURE && <Alert type={Constant.ALERT_TYPE_ERROR} message={`Saving data is failed. ${error}`} />}
				{errMsg !== "" && <Alert type={Constant.ALERT_TYPE_ERROR} message={`${errMsg}`} />}


				<div className="flex items-center justify-center">
					<div className="flex-1 px-3 my-2 py-2 rounded border border-gray-300 max-w-xl">
						<div>
							<div className="mb-2">
								<label className="block text-gray-700 mb-2" htmlFor="amount">
									Amount <span className="text-red-600 ml-1">*</span>
								</label>
								<input
									type="number"
									id="amount"
									value={expense.amount}
									onChange={(e) => setValue("amount", e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
									required
								/>
								{(expense.amount == undefined || expense.amount == "") && <><br /><span className="text-sm italic text-red-600 ml-1">* This field is required</span></>}
							</div>

							<div className="mb-2">
								<label className="block text-gray-700 mb-2" htmlFor="category">
									Category <span className="text-red-600 ml-1">*</span>
								</label>
								<select
									id="categoryId"
									onChange={(e) => setValue("categoryId", e.target.value)}
									value={expense.categoryId}
									className="w-full p-2 border border-gray-300 rounded"
								>
									<option value="">[Please select]</option>
									{categoryList && categoryList?.map((category: JSONObject) => (
										<option key={category._id} value={category._id}>{category.name}</option>
									))}
								</select>
								{(expense.categoryId == undefined || expense.categoryId == "") && <><br /><span className="text-sm italic text-red-600 ml-1">* This field is required</span></>}
							</div>

							<div className="mb-2">
								<label className="block text-gray-700 mb-2" htmlFor="date">
									Date <span className="text-red-600 ml-1">*</span>
								</label>
								<DateField
									id="date"
									value={expense.date}
									handleOnChange={(date) => setValue("date", date)}
									className="w-full p-2 border border-gray-300 rounded"
								/>
								{(expense.date == undefined || expense.date == "") && <><br /><span className="text-sm italic text-red-600 ml-1">* This field is required</span></>}
							</div>

							<div className="mb-2">
								<label className="block text-gray-700 mb-2" htmlFor="description">
									Description
								</label>
								<textarea
									id="description"
									value={expense.description}
									onChange={(e) => setValue("description", e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>

							<div className="grid grid-cols-2 gap-x-3">
								<button
									type="submit"
									className="bg-mint-green px-4 py-2 rounded hover:bg-green-300"
									onClick={(e) => handleOnSave(e, false)}
								>
									Save & Go back
								</button>
								<button
									type="submit"
									className="bg-blue-greeny px-4 py-2 rounded hover:bg-teal-400"
									onClick={(e) => handleOnSave(e, true)}
								>
									Save & Continue
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

