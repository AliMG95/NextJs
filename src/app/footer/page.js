/** @format */

import React from "react";
import Link from "next/link";

function footer() {
	return (
		<div className="bg-blue-600 text-white text-sm py-4">
			<div className="container mx-auto text-center space-y-2">
				<div className="flex justify-center space-x-4">
					<Link href="/about" className="hover:underline">
						About
					</Link>
					<Link href="/contact" className="hover:underline">
						Help
					</Link>
					<Link href="/privacy" className="hover:underline">
						Privacy
					</Link>
					<Link href="/terms" className="hover:underline">
						Terms
					</Link>
					<Link href="/cookies" className="hover:underline">
						Cookies
					</Link>
					<Link href="/more" className="hover:underline">
						More
					</Link>
				</div>
				<p>&copy; 2023 Facebook Clone</p>
			</div>
		</div>
	);
}

export default footer;
