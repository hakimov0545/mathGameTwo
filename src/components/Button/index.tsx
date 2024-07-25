import clsx from "clsx";
import React from "react";
import "./index.css";

export const Button = ({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={clsx(
				"p-2 border-none bg-blue-600 text-white hover:shadow-md transition-all",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};
