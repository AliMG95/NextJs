/** @format */
"use client";

/** @format */

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FaFacebook,
	FaHome,
	FaUserFriends,
	FaTv,
	FaStore,
	FaUsers,
	FaTh,
	FaCommentDots,
	FaBell,
	FaSearch,
} from "react-icons/fa";

function Navbar() {
	const pathname = usePathname();

	const isActive = (path) => {
		return pathname === path;
	};

	return (
		<>
			<nav className="bg-white text-black shadow-md">
				<div className="container mx-auto flex items-center justify-between py-2 px-4">
					{/* Facebook Icon and Search */}
					<div className="text-2xl font-bold flex items-center space-x-2 text-blue-600">
						<FaFacebook size={32} />
						<div className="flex items-center bg-gray-200 text-black rounded-full px-3 py-1">
							<FaSearch className="mr-2" size={20} />
							<input
								type="text"
								placeholder="Search Facebook"
								className="outline-none bg-transparent"
							/>
						</div>
					</div>

					{/* Main Navigation Icons */}
					<div className="flex space-x-6">
						<Link
							href="/"
							className={`${
								isActive("/") ? "text-blue-600" : "text-gray-400"
							} hover:text-blue-600`}>
							<FaHome size={28} />
						</Link>
						<Link
							href="/users"
							className={`${
								isActive("/users") ? "text-blue-600" : "text-gray-400"
							} hover:text-blue-600`}>
							<FaUserFriends size={28} />
						</Link>
						<Link
							href="/watch"
							className={`${
								isActive("/watch") ? "text-blue-600" : "text-gray-400"
							} hover:text-blue-600`}>
							<FaTv size={28} />
						</Link>
						<Link
							href="/marketplace"
							className={`${
								isActive("/marketplace") ? "text-blue-600" : "text-gray-400"
							} hover:text-blue-600`}>
							<FaStore size={28} />
						</Link>
						<Link
							href="/groups"
							className={`${
								isActive("/groups") ? "text-blue-600" : "text-gray-400"
							} hover:text-blue-600`}>
							<FaUsers size={28} />
						</Link>
					</div>

					{/* Secondary Navigation Icons */}
					<div className="flex space-x-6 text-gray-600">
						<Link href="/menu" className="hover:text-gray-800">
							<FaTh size={28} />
						</Link>
						<Link href="/messages" className="hover:text-gray-800">
							<FaCommentDots size={28} />
						</Link>
						<Link href="/notifications" className="hover:text-gray-800">
							<FaBell size={28} />
						</Link>
						<div className="relative group">
							<Link href="/profile" className="hover:text-gray-800">
								<img
									src="https://i.pinimg.com/736x/63/6e/3b/636e3b9e7b967e40fa8e0c9690f4ac8a.jpg"
									alt="Profile"
									className="w-8 h-8 rounded-full"
								/>
							</Link>
							<div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block">
								<Link
									href="/settings"
									className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
									Settings
								</Link>
								<Link
									href="/logout"
									className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
									Logout
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
