"use server";

import mongoose, {  Schema } from "mongoose";

const ExpenseSchema = new Schema ( 
    {
        userId: {
            type: String,
            required: true,
            ref: 'User',
        },
        categoryId: {
            type: String,
            required: true,
        },
        amount: { type: Number, required: true },
        description: { type: String, required: false },
        date: { type: Date, required: true },
        
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
)
const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

export default Expense;