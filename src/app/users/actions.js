/** @format */

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUser(id) {
	try {
		const res = await fetch(`/api/users?id=${id}`, {
			method: "DELETE",
		});
		if (!res.ok) throw new Error("Failed to delete user");
		return { success: true };
	} catch (error) {
		return { error: error.message };
	}
}

export async function createUser(formData) {
	const user = {
		name: formData.get("name"),
		email: formData.get("email"),
		phone: formData.get("phone"),
		website: formData.get("website"),
	};

	try {
		const res = await fetch("/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!res.ok) throw new Error("Failed to create user");
		return { success: true };
	} catch (error) {
		return { error: error.message };
	}
}

export async function goBack() {
	redirect("/users");
}
