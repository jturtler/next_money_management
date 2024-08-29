

// Daily Expenses (Heatmap Calendar)
// Purpose: Shows the amount spent each day on a calendar heatmap.
// Use Case: Helps users identify spending patterns, such as high-expense days or weeks.

'use client'


import { useCategory } from "@/contexts/CategoryContext";
import { JSONObject } from "@/lib/definations";
import { Calendar } from "nextjs-jc-component-libs/dist/components";
import * as Utils from "@/lib/utils";
import { EventType } from "nextjs-jc-component-libs/dist/libs/definations";
import { useEffect, useState } from "react";
import Modal from "@/ui/basics/Modal";


export default function DailyExpense({startDate, data}: {startDate: Date, data: JSONObject[]}) {
    
	const { categoryList } = useCategory();
    const [detailsEvents, setDetailsEvents] = useState<JSONObject | null>(null);

    const transformData = (): EventType[] => {
        let events: EventType[] = [];
        for( var i = 0; i<data.length; i++ ) {
            const item = data[i];
            const category = Utils.findItemFromList(categoryList!, item.categoryId, "_id")!;
            const event: EventType = {
                title: `${category.name} - ${item.description}: ${item.amount}$`,
                start: Utils.convertDateStrToObj(item.date), // YYYY, MM, DD, HH, MM
                end: Utils.convertDateStrToObj(item.date),
                color: category.color
            };

            events.push(event);
        }
        return events;
    }

    const showExpenseList = (calendarData: JSONObject) => {
        const dateStr = Utils.formatDateObjToDbDate(calendarData.date).substring(0,10); // Get the date only, remove the time stamp
        let total = 0;
		let filteredList = data.filter((item) => {
			if (item.date.substring(0,10) === dateStr ) {
                total += item.amount;
				return true;
			}
			return false;
		});

        filteredList = (filteredList === undefined ) ? [] : Utils.sortArrayByDate(filteredList);
        setDetailsEvents({date: calendarData.date, events: filteredList, total});
	}


    const events = transformData();

    return (
        <>
            <div> 
                <Calendar events={events} initMonth={startDate.getMonth() + 1} initYear={startDate.getFullYear()} onClick={(date: Date) => showExpenseList(date)} />
            </div>

            {detailsEvents && <Modal isVisible={true}>
                <div className="bg-white w-1/3 p">
                    <h2 className="flex flex-row bg-white p-3 text-xl border-b border-gray-300 mb-3">
                        <span className="flex-1" >Expense {detailsEvents.total}$ on {Utils.formatDisplayDateObj(detailsEvents.date)}</span>
                        <span className="" onClick={() => setDetailsEvents(null)}>x</span>
                    </h2>
                    <ul className="m-3 space-y-3">
                        {detailsEvents!.events.map((expense, index) => {
                            const category = Utils.findItemFromList(categoryList!, expense.categoryId, "_id")!;
                            return ( <li key={`details_${index}`} className="p-2" style={{backgroundColor: category.color}}>
                                {category.name} - {expense.description} : <span>{expense.amount}$</span>
                            </li> )
                            })}
                    </ul>
                </div>
            </Modal>}
        </>
    );
}
