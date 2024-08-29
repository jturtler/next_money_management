'use client'

import { useCategory } from '@/contexts/CategoryContext';
import { JSONObject } from '@/lib/definations';
import { useEffect, useRef, useState } from 'react';
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";
import * as Constant from "@/lib/constants";
import CustomDatePicker from '../basics/DatePicker';
import * as Utils from "@/lib/utils";
import * as AppStore from "@/lib/appStore";
import { useMainUi } from '@/contexts/MainUiContext';
import { MdPostAdd } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";


export default function FilterNavigation({ onSelectCategory, onSeleteDataVisualization, onSeleteStartDate, onSelectEndDate }: { onSelectCategory: (ids: string[]) => void, onSeleteDataVisualization: (name: string) => void, onSeleteStartDate: (date: Date | null) => void, onSelectEndDate: (date: Date | null) => void }) {
    const { categoryList } = useCategory();
    const { setSubPage } = useMainUi();

    const [dataVisualization, setDataVisualization] = useState<string>(Constant.DATA_VISUALIZATION_DATA_LIST);
    const [startDate, setStartDate] = useState<Date | null>(Utils.getStartDateOfCurrentDate());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const [showReduceFilterBar, setShowReduceFilterBar] = useState(false);

    const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
    const scrollRef = useRef<HTMLUListElement>(null);


    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -150, // Adjust the scroll distance as needed
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 150, // Adjust the scroll distance as needed
                behavior: 'smooth',
            });
        }
    };

    const dataVisualizationList = [
        { id: Constant.DATA_VISUALIZATION_DATA_LIST, name: "Table List" },

        // Daily Expenses (Heatmap Calendar)
        // Purpose: Shows the amount spent each day on a calendar heatmap.
        // Use Case: Helps users identify spending patterns, such as high-expense days or weeks.
        { id: Constant.DATA_VISUALIZATION_DAILY_EXPENSE, name: "Daily Expenses" },

        // Expense Distribution by Category (Pie/Donut Chart)
        // Purpose: Shows how a user’s expenses are distributed across different categories (e.g., food, rent, utilities, entertainment).
        // Use Case: Helps users identify which categories consume the largest portion of their budget.
        { id: Constant.DATA_VISUALIZATION_DISTRIBUTION_BY_CATEGORY, name: "Expense Distribution by Category" },

        // 2. Monthly Expense Trends (Line Chart)
        // Purpose: Displays expenses over time, typically on a monthly basis.
        // Use Case: Helps users track changes in their spending over time, identify trends, and plan future budgets.
        { id: Constant.DATA_VISUALIZATION_MONTHLY_EXPENSE_TRENDS, name: "Monthly Expense Trends" },

        // 4. Expenses Over Time by Category (Stacked Area Chart)
        // Purpose: Displays how spending in different categories changes over time.
        // Use Case: Allows users to see which categories are growing or shrinking and adjust their budget accordingly.
        { id: Constant.DATA_VISUALIZATION_EXPENSE_OVERTIME_BY_CATEGORY, name: "Expenses Over Time by Category" },

        // Top 5 Expense Categories (Horizontal Bar Chart)
        // Purpose: Highlights the top 5 categories where users spend the most.
        // Use Case: Helps users quickly see which areas are driving the majority of their expenses.
        { id: Constant.DATA_VISUALIZATION_TOP_5_EXPENSE_CATEGORY, name: "Top 5 Expense Categories" }
    ];

    useEffect(() => {
        // Initialize "All" checkbox as checked
        if (checkboxRefs.current[0]) {
            checkboxRefs.current[0].checked = true;
        }
    }, []);

    const handleSelectCategoryItem = () => {
        const checkedCategories = getCategoryIdList();
        onSelectCategory(checkedCategories);
    }

    const getCategoryIdList = (): string[] => {
        const checkedCategories = checkboxRefs.current
            .filter((checkbox) => checkbox?.checked)
            .map((checkbox) => checkbox?.value)
            .filter((value): value is string => value !== undefined); // Filter out undefined values

        return checkedCategories;
    }

    const getCategoryNameList = (): string[] => {
        let categoryNames: string[] = [];

        const checkedCategories = getCategoryIdList();
        for (var i = 0; i < checkedCategories.length; i++) {
            const categoryId = checkedCategories[i];
            if (categoryId === "") {
                categoryNames.push("All");
            }
            else {
                const category = Utils.findItemFromList(categoryList!, categoryId, "_id")!;
                categoryNames.push(category.name);
            }
        }

        return categoryNames;
    }

    return (
        <nav className="bg-background-color">
            <div className="relative text-gray-800 bg-dark-slate pl-4 pr-2 flex flex-row border border-gray-200 items-center py-1">
                <button
                    onClick={scrollLeft}
                    className="text-bright-lime-green hover:text-hightlight-green"
                >
                    <TiMediaPlayReverse size={25} />
                </button>

                <ul className="flex space-x-5 overflow-x-hidden scroll-smooth w-full items-start text-sm text-white" ref={scrollRef}>
                    {dataVisualizationList.map((item: JSONObject, idx: number) => (
                        <li
                            key={`dataVisual_${idx}`}
                            onClick={() => { setDataVisualization(item.id); onSeleteDataVisualization(item.id); }}
                            className={`min-w-max hover:bg-slate-blue px-3 cursor-pointer rounded-sm py-1 border-r border-gray-400 justify-center ${dataVisualization == item.id && "bg-slate-blue text-gray-100"}`}>
                            {item.name}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={scrollRight}
                    className="text-bright-lime-green hover:text-hightlight-green"
                >
                    <TiMediaPlay size={25} />
                </button>

                <button
                    className="ml-2 items-center justify-center bg-white rounded-md"
                    onClick={() => { AppStore.setSelected(null); setSubPage(Constant.SUB_UI_ADD_FORM) }}><MdFormatListBulletedAdd className="text-paradise-pink" size={25} /></button>
            </div>


            {/* {!showReduceFilterBar && <div className="flex flex-row justify-end items-center w-full m-auto">
                <IoIosArrowDropupCircle className="text-blue-navy mx-3 my-2 cursor-pointer" size={20} onClick={() => setShowReduceFilterBar(true)}/>
            </div>} */}

            {showReduceFilterBar && <div className="flex flex-row bg-sunny-yellow cursor-pointer" onClick={() => setShowReduceFilterBar(false)}>
                <div className='italic p-2 text-sm'>Expense data is from <span className="font-semibold">{Utils.formatDisplayDateObj(startDate!)}</span> to <span className="font-semibold">{Utils.formatDisplayDateObj(endDate!)}</span> of categories <span className="font-semibold">{getCategoryNameList().join(", ")}</span></div>

                <div className="m-auto"></div>
                <IoIosArrowDropdownCircle className="text-blue-navy mx-3 mt-2 cursor-pointer" size={20} />
            </div>}

            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 px-5 mt-3 gap-x-3 mb-4 text-gray-600 items-start" style={{ display: showReduceFilterBar ? "none" : "" }}>

                {/* Category list with checkboxes */}
                <div className="mb-3 col-span-3">
                    <label className="block text-gray-700 mb-2 text-sm" htmlFor="category">Category</label>
                    <div id="category" className="w-full border border-gray-300 rounded-md p-3 max-h-36 overflow-y-auto grid grid-cols-1 md:grid-cols-3">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`category_all`}
                                value={""}
                                onChange={() => handleSelectCategoryItem()}
                                ref={(el) => { checkboxRefs.current[0] = el; }}
                                className="mr-2"
                            />
                            <label htmlFor={`category_all`} className="text-sm cursor-pointer">
                                All
                            </label>
                        </div>

                        {categoryList?.map((category: JSONObject, idx: number) => (
                            <div key={`category_${category._id}`} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={`category_${category._id}`}
                                    value={category._id}
                                    onChange={() => handleSelectCategoryItem()}
                                    ref={(el) => { checkboxRefs.current[idx + 1] = el; }}
                                    className="mr-2"
                                />
                                <label htmlFor={`category_${category._id}`} className="text-sm cursor-pointer">
                                    {category.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-3 col-span-2">
                    <div>
                        <div className="relative flex items-center">
                            <label className="flex-1 whitespace-nowrap text-gray-700 mb-2 text-sm">Start Date</label>
                            {!showReduceFilterBar && (
                                <div className="absolute top-0 right-0 mr-2 flex items-center">
                                    <IoIosArrowDropupCircle
                                        className="text-blue-navy cursor-pointer"
                                        size={20}
                                        onClick={() => setShowReduceFilterBar(true)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Start Date Picker */}
                        <CustomDatePicker
                            id="startDate"
                            selectedDate={startDate}
                            onDateChange={(date: Date | null) => { setStartDate(date); onSeleteStartDate(date); }}
                        />
                    </div>

                    <div className="mt-3">
                        <label className="block text-gray-700 mb-2 text-sm" htmlFor="endDate">End Date</label>
                        {/* End Date Picker */}
                        <CustomDatePicker
                            id="endDate"
                            selectedDate={endDate}
                            onDateChange={(date: Date | null) => { setEndDate(date); onSelectEndDate(date) }}
                        />
                    </div>
                </div>

            </div>
        </nav>
    );
}