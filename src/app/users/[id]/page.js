/** @format */

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EditUserForm from "./EditUserForm";

/**
 * UserDetailsPage component for displaying and editing user information
 */
export default function UserDetailsPage({ params }) {
	const router = useRouter();
	const id = React.use(params).id;
	const [user, setUser] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	React.useEffect(() => {
		fetchUser();
	}, [id]); // Re-fetch when ID changes

	const fetchUser = async () => {
		try {
			const res = await fetch(`/api/users/${id}`);
			const data = await res.json();
			setUser(data);
			setError(null);
		} catch (error) {
			console.error("Error fetching user:", error);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Delete user method
	const handleDelete = async () => {
		try {
			const res = await fetch(`/api/users/${id}`, {
				method: "DELETE",
			});
			router.push("/users");
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	// Handle edit save
	const handleSave = async (updatedUser) => {
		try {
			const res = await fetch(`/api/users/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...updatedUser, id: parseInt(id) }),
			});

			const data = await res.json();
			setUser(data);
			setIsEditing(false);
			router.refresh();
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error || !user) {
		return (
			<div className="min-h-screen bg-gray-50 p-8">
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-xl shadow-lg p-8 text-center">
						<div className="text-red-500 text-6xl mb-4">⚠️</div>
						<h1 className="text-2xl font-bold text-gray-800 mb-4">
							User Not Found
						</h1>
						<p className="text-gray-600 mb-6">
							The user you are looking for does not exist or has been deleted.
						</p>
						<button
							onClick={() => router.push("/users")}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
							Back to Users List
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					{/* Header */}
					<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
						<h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
						<p className="text-blue-100">User Profile Details</p>
					</div>

					{/* Details */}
					<div className="p-6">
						{isEditing ? (
							<EditUserForm
								user={user}
								onCancel={() => setIsEditing(false)}
								onSave={handleSave}
							/>
						) : (
							<>
								<table className="w-full">
									<tbody className="divide-y divide-gray-200">
										<tr className="hover:bg-gray-50 transition-colors duration-200">
											<td className="py-4 pl-4 pr-8 font-medium text-gray-700 w-1/3">
												Email
											</td>
											<td className="py-4 px-4 text-gray-900">{user.email}</td>
										</tr>
										<tr className="hover:bg-gray-50 transition-colors duration-200">
											<td className="py-4 pl-4 pr-8 font-medium text-gray-700">
												Phone
											</td>
											<td className="py-4 px-4 text-gray-900">{user.phone}</td>
										</tr>
										<tr className="hover:bg-gray-50 transition-colors duration-200">
											<td className="py-4 pl-4 pr-8 font-medium text-gray-700">
												Website
											</td>
											<td className="py-4 px-4 text-gray-900">
												<a
													href={`https://${user.website}`}
													className="text-blue-600 hover:text-blue-800 hover:underline"
													target="_blank"
													rel="noopener noreferrer">
													{user.website}
												</a>
											</td>
										</tr>
									</tbody>
								</table>

								{/* Action Buttons */}
								<div className="mt-8 flex gap-4">
									<button
										onClick={() => setIsEditing(true)}
										className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200">
										Edit User
									</button>
									<button
										onClick={handleDelete}
										className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
										Delete User
									</button>
									<button
										onClick={() => router.push("/users")}
										className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2">
										Back to Users
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
