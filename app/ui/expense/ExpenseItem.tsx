/** Displays individual expense details with options to edit or delete. */

"use client";

import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import * as AppStore from "@/lib/appStore";
import * as Constant from "@/lib/constants";
import { FaShoppingCart, FaUtensils, FaHome, FaCar } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useExpense } from "@/contexts/ExpenseContext";
import Alert from "../basics/Alert";
import { useCategory } from "@/contexts/CategoryContext";
import { GiClothes } from "react-icons/gi";
import { MdOutlineSchool } from "react-icons/md";
import { FaTheaterMasks } from "react-icons/fa";
import { PiBowlFoodFill } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { PiHouseLineDuotone } from "react-icons/pi";
import { GiEarrings } from "react-icons/gi";
import { GiPiggyBank } from "react-icons/gi";
import { GiHealthNormal } from "react-icons/gi";
import { useMainUi } from "@/contexts/MainUiContext";


export default function ExpenseItem({ data, style = "large", index }: { data: JSONObject, style: string, index: number }) {

	const { setSubPage } = useMainUi();
	const { error, processingStatus, deleteExpense } = useExpense();

	const { categoryList } = useCategory();

	const setSelectedExpense = () => {
		AppStore.setSelected(data);
		setSubPage(Constant.SUB_UI_EDIT_FORM);
	}

	const handleOnDelete = () => {
		const ok = confirm(`Are you sure you want to delete this expense ${data.description} ?`);
		if (ok) {
			deleteExpense(data._id);
		}
	}

	const dateStr = Utils.formatDisplayDateObj(Utils.convertDateStrToObj(data.date));

	return (
		<>
			{processingStatus == Constant.DELETE_BUDGET_SUCCESS && <Alert type={Constant.ALERT_TYPE_INFO} message={`Deleted successfully.`} />}
			{processingStatus == Constant.DELETE_BUDGET_FAILURE && <Alert type={Constant.ALERT_TYPE_ERROR} message={`Deleted Failed. ${error}`} />}

			{style == "large" && <>

				<div className="px-4 py-2 border-b border-gray-300" onClick={() => setSelectedExpense()}>{dateStr}</div>
				<div className="px-4 py-2 flex space-x-3 border-b border-gray-300 col-span-2" onClick={() => setSelectedExpense()}>
					{Utils.findItemFromList(categoryList!, data.categoryId, "_id")!.name} - {data.description}
				</div>
				<div className="px-4 py-2 font-bold border-b border-gray-300" onClick={() => setSelectedExpense()}>{data.amount} $</div>
				<div className="px-4 py-2 border-b border-gray-300 text-right">
					<button
						onClick={() => handleOnDelete()}
						className="text-living-coral hover:text-red-700 w-6"
					>
						<MdDeleteOutline className="w-6 h-6" />
					</button>
				</div>
			</>}

			{style == "small" && <div className={`m-2 flex px-4 py-2 items-center border border-gray-300 rounded bg-white}`}
				>
				<div className="flex-1">
					<div className="mb-2 flex flex-row items-center">
						<span onClick={() => setSelectedExpense()} >{dateStr}</span>
						<button
							onClick={() => handleOnDelete()}
							className="text-living-coral hover:text-red-700 w-6 ml-auto flex items-center justify-center"
						>
							<MdDeleteOutline className="w-6 h-6" />
						</button>
					</div>

					<div className="mb-2 italic text-sm flex flex-row space-x-3"  onClick={() => setSelectedExpense()} >
						<span>{Utils.findItemFromList(categoryList!, data.categoryId, "_id")!.name}</span>
						{data.description && <> <span>-</span> <span>{data.description}</span></>}
					</div>
					<div className="font-bold">Amount: {data.amount} $</div>
				</div>
			</div>}
		</>
	)
}