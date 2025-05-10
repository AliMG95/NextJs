/** @format */

import { users, updateDataFile } from "./data";


export async function GET() {
	return Response.json(users);
}


export async function POST(req) {
	try {
		const user = await req.json();

		if (!user.name || !user.email) {
			return Response.json(
				{ error: "Name and email are required" },
				{ status: 400 }
			);
		}

		const newId =
			users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
		const newUser = {
			...user,
			id: newId,
		};

		await updateDataFile(newUser);

		return Response.json(newUser, { status: 201 });
	} catch (error) {
		console.error("Error creating user:", error);
		return Response.json({ error: "Failed to create user" }, { status: 500 });
	}
}


export async function DELETE(req) {
	try {
		const { searchParams } = new URL(req.url);
		const id = parseInt(searchParams.get("id"));

		if (!id) {
			return Response.json({ error: "User ID is required" }, { status: 400 });
		}

		const userIndex = users.findIndex((user) => user.id === id);

		if (userIndex === -1) {
			return Response.json({ error: "User not found" }, { status: 404 });
		}

		const deletedUser = users[userIndex];
		users.splice(userIndex, 1);

		await updateDataFile();

		return Response.json(deletedUser);
	} catch (error) {
		return Response.json({ error: "Failed to delete user" }, { status: 500 });
	}
}
