'use client'

import React from "react";
import ExpenseItem from "../ExpenseItem";
import { JSONObject } from "@/lib/definations";

export default function DataList({ data }: { data: JSONObject[] }) {

    return (
        <>
        {/* <!-- Table for larger screens --> */}
            <div className="flex-1 py-3 hidden md:block bg-white mt-4">
                <div className=" overflow-y-auto">
                    <div className="grid grid-cols-5 gap-y-4">
                        <div className="px-4 py-2 text-left font-medium border-b border-gray-300">Date</div>
                        <div className="px-4 py-2 text-left font-medium border-b border-gray-300 col-span-2">Description</div>
                        <div className="px-4 py-2 text-left font-medium border-b border-gray-300">Amount</div>
                        <div className="px-4 py-2 font-medium border-b border-gray-300 col-start-5 col-end-6 text-right">#</div> 
                        

                        {data.map((expense: JSONObject, index: number) => (
                            <ExpenseItem style="large" key={expense._id} data={expense} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* <!-- Divs for smaller screens --> */}
            <div className="md:hidden bg-white">
                {data.map((expense: JSONObject, index: number) => (
                    <ExpenseItem style="small" key={expense._id} data={expense} index={index} />
                ))}
            </div>
        </>
    )
}
