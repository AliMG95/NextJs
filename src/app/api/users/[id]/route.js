/** @format */

import { users } from "../data";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
	const user = users.find((u) => u.id === parseInt(params.id));
	return NextResponse.json(user);
}


export async function PUT(request, { params }) {
	const updatedUser = await request.json();
	const index = users.findIndex((u) => u.id === parseInt(params.id));
	users[index] = { ...users[index], ...updatedUser };
	return NextResponse.json(users[index]);
}


export async function DELETE(request, { params }) {
	const index = users.findIndex((u) => u.id === parseInt(params.id));
	const deletedUser = users[index];
	users.splice(index, 1);
	return NextResponse.json(deletedUser);
}
