import React from 'react'
import Link from 'next/link'

export const metadata = {
	title: "Not Found",
	description: "Page not found. Please check the URL or return home.",
};

function notfound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page Not Found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default notfound
