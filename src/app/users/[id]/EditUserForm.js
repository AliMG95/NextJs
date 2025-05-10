/** @format */

"use client";
import { useState } from "react";

export default function EditUserForm({ user, onCancel, onSave }) {
	const [formData, setFormData] = useState({
		name: user.name || "",
		email: user.email || "",
		phone: user.phone || "",
		website: user.website || "",
	});

	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}
		if (!formData.phone.trim()) newErrors.phone = "Phone is required";
		if (!formData.website.trim()) newErrors.website = "Website is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			onSave(formData);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: undefined,
			}));
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Name
				</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
						errors.name ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-500">{errors.name}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Email
				</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
						errors.email ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.email && (
					<p className="mt-1 text-sm text-red-500">{errors.email}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Phone
				</label>
				<input
					type="text"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
						errors.phone ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.phone && (
					<p className="mt-1 text-sm text-red-500">{errors.phone}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Website
				</label>
				<input
					type="text"
					name="website"
					value={formData.website}
					onChange={handleChange}
					className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
						errors.website ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.website && (
					<p className="mt-1 text-sm text-red-500">{errors.website}</p>
				)}
			</div>

			<div className="flex gap-4 mt-6">
				<button
					type="submit"
					className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
					Save Changes
				</button>
				<button
					type="button"
					onClick={onCancel}
					className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
					Cancel
				</button>
			</div>
		</form>
	);
}
