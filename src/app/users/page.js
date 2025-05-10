/** @format */

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
export default function UsersPage() {
	const [users, setUsers] = useState([]);
	const [newRow, setNewRow] = useState(null);
	const [editingUser, setEditingUser] = useState(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		try {
			const res = await fetch("http://localhost:3000/api/users");
			const data = await res.json();
			setUsers(data);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}

	function handleAddUser() {
		const maxId = Math.max(...users.map((user) => user.id), 0);
		setNewRow({
			id: maxId + 1,
			name: "",
			email: "",
			phone: "",
			website: "",
		});
	}

	async function handleSaveUser(newUser) {
		try {
			const res = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});
			await fetchUsers();
			setNewRow(null);
		} catch (error) {
			console.error("Error creating user:", error);
		}
	}

	async function handleDeleteUser(userId) {
		try {
			const res = await fetch(`/api/users/${userId}`, {
				method: "DELETE",
			});
			await fetchUsers();
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	}

	function handleEditClick(user) {
		setEditingUser({ ...user });
	}

	async function handleEditSave(updatedUser) {
		try {
			const res = await fetch(`/api/users/${updatedUser.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedUser),
			});
			await fetchUsers();
			setEditingUser(null);
		} catch (error) {
			console.error("Error updating user:", error);
		}
	}

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600">
				Users
			</h1>
			<div className="flex justify-end mb-4">
				<button
					onClick={handleAddUser}
					className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300">
					Add User
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="table-auto w-full bg-white shadow-lg rounded-lg">
					<thead>
						<tr className="bg-blue-500 text-white">
							<th className="px-4 py-2">ID</th>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Email</th>
							<th className="px-4 py-2">Phone</th>
							<th className="px-4 py-2">Website</th>
							<th className="px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.length === 0 ? (
							<tr>
								<td
									colSpan="6"
									className="text-center py-8 text-gray-500 text-lg">
									No Data till yet
								</td>
							</tr>
						) : (
							<>
								{users.map((user, index) => (
									<tr
										key={user.id}
										className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
										<td className="px-4 py-2">{user.id}</td>
										<td className="px-4 py-2">
											{editingUser?.id === user.id ? (
												<input
													type="text"
													value={editingUser.name}
													onChange={(e) =>
														setEditingUser({
															...editingUser,
															name: e.target.value,
														})
													}
													className="border rounded px-2 py-1 w-full"
												/>
											) : (
												user.name
											)}
										</td>
										<td className="px-4 py-2">
											{editingUser?.id === user.id ? (
												<input
													type="email"
													value={editingUser.email}
													onChange={(e) =>
														setEditingUser({
															...editingUser,
															email: e.target.value,
														})
													}
													className="border rounded px-2 py-1 w-full"
												/>
											) : (
												user.email
											)}
										</td>
										<td className="px-4 py-2">
											{editingUser?.id === user.id ? (
												<input
													type="text"
													value={editingUser.phone}
													onChange={(e) =>
														setEditingUser({
															...editingUser,
															phone: e.target.value,
														})
													}
													className="border rounded px-2 py-1 w-full"
												/>
											) : (
												user.phone
											)}
										</td>
										<td className="px-4 py-2">
											{editingUser?.id === user.id ? (
												<input
													type="text"
													value={editingUser.website}
													onChange={(e) =>
														setEditingUser({
															...editingUser,
															website: e.target.value,
														})
													}
													className="border rounded px-2 py-1 w-full"
												/>
											) : (
												user.website
											)}
										</td>
										<td className="px-4 py-2 flex space-x-2">
											{editingUser?.id === user.id ? (
												<>
													<button
														onClick={() => handleEditSave(editingUser)}
														className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
														Save
													</button>
													<button
														onClick={() => setEditingUser(null)}
														className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
														Cancel
													</button>
												</>
											) : (
												<>
													<button
														onClick={() => handleEditClick(user)}
														className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
														Edit
													</button>
													<button
														onClick={() => handleDeleteUser(user.id)}
														className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
														Delete
													</button>
													<Link
														href={`/users/${user.id}`}
														className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
														View Details
													</Link>
												</>
											)}
										</td>
									</tr>
								))}
							</>
						)}
						{newRow && (
							<tr className="bg-yellow-100">
								<td className="px-4 py-2">{newRow.id}</td>
								<td className="px-4 py-2">
									<input
										type="text"
										placeholder="Name"
										className="border rounded px-2 py-1 w-full"
										onChange={(e) =>
											setNewRow({ ...newRow, name: e.target.value })
										}
									/>
								</td>
								<td className="px-4 py-2">
									<input
										type="email"
										placeholder="Email"
										className="border rounded px-2 py-1 w-full"
										onChange={(e) =>
											setNewRow({ ...newRow, email: e.target.value })
										}
									/>
								</td>
								<td className="px-4 py-2">
									<input
										type="text"
										placeholder="Phone"
										className="border rounded px-2 py-1 w-full"
										onChange={(e) =>
											setNewRow({ ...newRow, phone: e.target.value })
										}
									/>
								</td>
								<td className="px-4 py-2">
									<input
										type="text"
										placeholder="Website"
										className="border rounded px-2 py-1 w-full"
										onChange={(e) =>
											setNewRow({ ...newRow, website: e.target.value })
										}
									/>
								</td>
								<td className="px-4 py-2 flex space-x-2">
									<button
										onClick={() => handleSaveUser(newRow)}
										className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
										Save
									</button>
									<button
										onClick={() => setNewRow(null)}
										className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
										Cancel
									</button>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
