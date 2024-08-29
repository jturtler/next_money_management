
import connectToDatabase from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import Category from "@/lib/schemas/Category.schema";
import * as Utils from "@/lib/utils";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request: NextRequest, {params}) {
    const url = new URL(request.url);
	
	await connectToDatabase();
    const searchResult = await Category.find({});
    const categoryList = ( searchResult.length > 0 ) ? Utils.converDbObjectToJson(searchResult) : [];

    return NextResponse.json(categoryList, {status: 200});
}


export async function POST( request: NextRequest ) {
    const payload: JSONObject = await request.json();

	await connectToDatabase();
    const newCategory = await Category.create(payload);

    return NextResponse.json(newCategory, {status: 200 })
}

export async function PUT( request: NextRequest, {params} ) {
    const payload: JSONObject = await request.json();

    const newCategory = await Category.findByIdAndUpdate(payload._id, payload, { new: true });

    return NextResponse.json(newCategory, {status: 200 })
}

export async function DELETE( request: NextRequest ) {
    const id = request.nextUrl.searchParams.get("id");

    await Category.findByIdAndDelete(id);
    return NextResponse.json({message: "Category is deleted."}, {status: 200});
}