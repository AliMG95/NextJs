/** @format */

export const users = [
	{
		id: 1,
		name: "ahmed",
		email: "ahmed@example.com",
		phone: "1234567890",
		website: "aa.com",
	},
];

export async function updateDataFile(userData) {
	try {
		const userIndex = users.findIndex((user) => user.id === userData.id);

		if (userIndex === -1) {
			users.push(userData);
		} else {
			users[userIndex] = { ...users[userIndex], ...userData };
		}

		return Promise.resolve(true);
	} catch (error) {
		console.error("Error updating data file:", error);
		return Promise.reject(error);
	}
}
